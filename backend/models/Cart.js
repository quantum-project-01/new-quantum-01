const { query, transaction } = require('../config/database');

class Cart {
  // Add item to cart
  static async addItem(userId, productId, quantity = 1) {
    return await transaction(async (client) => {
      // Check if product exists and is in stock
      const productResult = await client.query(
        'SELECT * FROM products WHERE id = $1 AND is_active = true AND in_stock = true',
        [productId]
      );

      if (productResult.rows.length === 0) {
        throw new Error('Product not found or out of stock');
      }

      const product = productResult.rows[0];

      // Check if requested quantity is available
      if (product.stock_quantity < quantity) {
        throw new Error(`Only ${product.stock_quantity} items available in stock`);
      }

      // Check if item already exists in cart
      const existingItemResult = await client.query(
        'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
        [userId, productId]
      );

      let cartItem;

      if (existingItemResult.rows.length > 0) {
        // Update existing item quantity
        const newQuantity = existingItemResult.rows[0].quantity + quantity;
        
        if (product.stock_quantity < newQuantity) {
          throw new Error(`Only ${product.stock_quantity} items available in stock`);
        }

        const updateResult = await client.query(
          'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
          [newQuantity, userId, productId]
        );
        cartItem = updateResult.rows[0];
      } else {
        // Add new item to cart
        const insertResult = await client.query(
          'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
          [userId, productId, quantity]
        );
        cartItem = insertResult.rows[0];
      }

      return cartItem;
    });
  }

  // Update item quantity in cart
  static async updateItemQuantity(userId, productId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(userId, productId);
    }

    return await transaction(async (client) => {
      // Check product stock
      const productResult = await client.query(
        'SELECT stock_quantity FROM products WHERE id = $1 AND is_active = true',
        [productId]
      );

      if (productResult.rows.length === 0) {
        throw new Error('Product not found');
      }

      const product = productResult.rows[0];

      if (product.stock_quantity < quantity) {
        throw new Error(`Only ${product.stock_quantity} items available in stock`);
      }

      // Update cart item
      const result = await client.query(
        'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
        [quantity, userId, productId]
      );

      if (result.rows.length === 0) {
        throw new Error('Cart item not found');
      }

      return result.rows[0];
    });
  }

  // Remove item from cart
  static async removeItem(userId, productId) {
    const text = `
      DELETE FROM cart_items
      WHERE user_id = $1 AND product_id = $2
      RETURNING *
    `;

    const result = await query(text, [userId, productId]);
    return result.rows[0];
  }

  // Get user's cart with product details
  static async getCartByUser(userId) {
    const text = `
      SELECT 
        ci.*,
        p.name as product_name,
        p.description as product_description,
        p.marked_price,
        p.discount_price,
        p.shipping_charges,
        p.images,
        p.stock_quantity,
        p.in_stock,
        p.category,
        (ci.quantity * p.discount_price) as item_total,
        (ci.quantity * p.shipping_charges) as item_shipping
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = $1 AND p.is_active = true
      ORDER BY ci.added_at DESC
    `;

    const result = await query(text, [userId]);
    return result.rows;
  }

  // Calculate cart totals
  static async getCartTotals(userId, couponCode = null) {
    const cartItems = await this.getCartByUser(userId);
    
    if (cartItems.length === 0) {
      return {
        items: [],
        subtotal: 0,
        shipping_charges: 0,
        discount: 0,
        tax: 0,
        total: 0,
        coupon_applied: null
      };
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.item_total, 0);
    const shippingCharges = cartItems.reduce((sum, item) => sum + item.item_shipping, 0);
    
    let discount = 0;
    let couponApplied = null;

    // Apply coupon if provided
    if (couponCode) {
      const couponResult = await this.validateCoupon(couponCode, subtotal, userId);
      if (couponResult.valid) {
        discount = couponResult.discount;
        couponApplied = couponResult.coupon;
      }
    }

    // Calculate tax (assuming 18% GST)
    const taxableAmount = subtotal - discount;
    const tax = Math.round(taxableAmount * 0.18 * 100) / 100;
    
    const total = subtotal + shippingCharges + tax - discount;

    return {
      items: cartItems,
      subtotal: Math.round(subtotal * 100) / 100,
      shipping_charges: Math.round(shippingCharges * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      coupon_applied: couponApplied
    };
  }

  // Validate coupon
  static async validateCoupon(couponCode, cartValue, userId) {
    const text = `
      SELECT * FROM coupons
      WHERE code = $1 
      AND is_active = true
      AND valid_from <= CURRENT_DATE
      AND valid_until >= CURRENT_DATE
      AND (max_uses IS NULL OR used_count < max_uses)
      AND min_cart_value <= $2
      AND (applicable_to = 'all' OR applicable_to = 'products')
    `;

    const result = await query(text, [couponCode, cartValue]);
    
    if (result.rows.length === 0) {
      return { valid: false, message: 'Invalid or expired coupon' };
    }

    const coupon = result.rows[0];

    // Check user usage limit
    const usageResult = await query(
      'SELECT COUNT(*) as usage_count FROM coupon_usage WHERE coupon_id = $1 AND user_id = $2',
      [coupon.id, userId]
    );

    const userUsageCount = parseInt(usageResult.rows[0].usage_count);
    
    if (userUsageCount >= coupon.user_limit_per_coupon) {
      return { valid: false, message: 'Coupon usage limit exceeded' };
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discount_type === 'percentage') {
      discount = (cartValue * coupon.discount_value) / 100;
      if (coupon.max_discount && discount > coupon.max_discount) {
        discount = coupon.max_discount;
      }
    } else {
      discount = coupon.discount_value;
    }

    return {
      valid: true,
      discount: Math.round(discount * 100) / 100,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        name: coupon.name,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value
      }
    };
  }

  // Clear user's cart
  static async clearCart(userId) {
    const text = `
      DELETE FROM cart_items
      WHERE user_id = $1
      RETURNING *
    `;

    const result = await query(text, [userId]);
    return result.rows;
  }

  // Get cart item count
  static async getCartItemCount(userId) {
    const text = `
      SELECT COALESCE(SUM(quantity), 0) as total_items
      FROM cart_items
      WHERE user_id = $1
    `;

    const result = await query(text, [userId]);
    return parseInt(result.rows[0].total_items);
  }

  // Check if product is in cart
  static async isProductInCart(userId, productId) {
    const text = `
      SELECT quantity FROM cart_items
      WHERE user_id = $1 AND product_id = $2
    `;

    const result = await query(text, [userId, productId]);
    return result.rows.length > 0 ? result.rows[0].quantity : 0;
  }

  // Merge guest cart with user cart (for after login)
  static async mergeGuestCart(userId, guestCartItems) {
    return await transaction(async (client) => {
      const mergedItems = [];

      for (const guestItem of guestCartItems) {
        try {
          // Check if item already exists in user cart
          const existingItemResult = await client.query(
            'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
            [userId, guestItem.product_id]
          );

          if (existingItemResult.rows.length > 0) {
            // Update quantity (add guest quantity to existing)
            const newQuantity = existingItemResult.rows[0].quantity + guestItem.quantity;
            
            // Check stock availability
            const productResult = await client.query(
              'SELECT stock_quantity FROM products WHERE id = $1',
              [guestItem.product_id]
            );

            const availableStock = productResult.rows[0]?.stock_quantity || 0;
            const finalQuantity = Math.min(newQuantity, availableStock);

            const updateResult = await client.query(
              'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
              [finalQuantity, userId, guestItem.product_id]
            );

            mergedItems.push(updateResult.rows[0]);
          } else {
            // Add new item
            const insertResult = await client.query(
              'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
              [userId, guestItem.product_id, guestItem.quantity]
            );

            mergedItems.push(insertResult.rows[0]);
          }
        } catch (error) {
          console.error(`Error merging cart item ${guestItem.product_id}:`, error);
          // Continue with other items
        }
      }

      return mergedItems;
    });
  }

  // Validate cart before checkout
  static async validateCartForCheckout(userId) {
    const cartItems = await this.getCartByUser(userId);
    const issues = [];

    for (const item of cartItems) {
      if (!item.in_stock) {
        issues.push({
          product_id: item.product_id,
          product_name: item.product_name,
          issue: 'out_of_stock'
        });
      } else if (item.stock_quantity < item.quantity) {
        issues.push({
          product_id: item.product_id,
          product_name: item.product_name,
          issue: 'insufficient_stock',
          available: item.stock_quantity,
          requested: item.quantity
        });
      }
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      cart_items: cartItems
    };
  }
}

module.exports = Cart; 