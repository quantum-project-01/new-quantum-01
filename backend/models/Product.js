const { query, transaction } = require('../config/database');

class Product {
  // Create a new product
  static async create(productData) {
    const {
      name,
      description,
      category,
      marked_price,
      discount_price,
      shipping_charges = 0,
      images = [],
      stock_quantity = 0,
      weight,
      dimensions,
      tags = []
    } = productData;

    const text = `
      INSERT INTO products (
        name, description, category, marked_price, discount_price, 
        shipping_charges, images, stock_quantity, weight, dimensions, tags, in_stock
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      name, description, category, marked_price, discount_price,
      shipping_charges, images, stock_quantity, weight,
      dimensions ? JSON.stringify(dimensions) : null,
      tags, stock_quantity > 0
    ];

    const result = await query(text, values);
    return result.rows[0];
  }

  // Find product by ID
  static async findById(id) {
    const text = `
      SELECT * FROM products
      WHERE id = $1 AND is_active = true
    `;

    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Get all products with filters and pagination
  static async findAll(filters = {}) {
    let text = `
      SELECT * FROM products
      WHERE is_active = true
    `;

    const values = [];
    let paramCount = 0;

    if (filters.category) {
      paramCount++;
      text += ` AND category = $${paramCount}`;
      values.push(filters.category);
    }

    if (filters.in_stock !== undefined) {
      paramCount++;
      text += ` AND in_stock = $${paramCount}`;
      values.push(filters.in_stock);
    }

    if (filters.min_price) {
      paramCount++;
      text += ` AND discount_price >= $${paramCount}`;
      values.push(filters.min_price);
    }

    if (filters.max_price) {
      paramCount++;
      text += ` AND discount_price <= $${paramCount}`;
      values.push(filters.max_price);
    }

    if (filters.search) {
      paramCount++;
      text += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount} OR $${paramCount} = ANY(tags))`;
      values.push(`%${filters.search}%`);
    }

    if (filters.tags && filters.tags.length > 0) {
      paramCount++;
      text += ` AND tags && $${paramCount}`;
      values.push(filters.tags);
    }

    // Sorting
    const sortBy = filters.sort_by || 'created_at';
    const sortOrder = filters.sort_order || 'DESC';
    
    if (['name', 'discount_price', 'created_at', 'rating'].includes(sortBy)) {
      text += ` ORDER BY ${sortBy} ${sortOrder}`;
    } else {
      text += ` ORDER BY created_at DESC`;
    }

    // Pagination
    text += ` LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    values.push(filters.limit || 20, filters.offset || 0);

    const result = await query(text, values);
    return result.rows;
  }

  // Search products by name or description
  static async search(searchTerm, limit = 20, offset = 0) {
    const text = `
      SELECT *,
        ts_rank(to_tsvector('english', name || ' ' || description), plainto_tsquery('english', $1)) as rank
      FROM products
      WHERE is_active = true
      AND (
        to_tsvector('english', name || ' ' || description) @@ plainto_tsquery('english', $1)
        OR name ILIKE $2
        OR description ILIKE $2
        OR $2 = ANY(tags)
      )
      ORDER BY rank DESC, created_at DESC
      LIMIT $3 OFFSET $4
    `;

    const values = [searchTerm, `%${searchTerm}%`, limit, offset];
    const result = await query(text, values);
    return result.rows;
  }

  // Update product
  static async update(id, updateData) {
    const allowedFields = [
      'name', 'description', 'category', 'marked_price', 'discount_price',
      'shipping_charges', 'images', 'stock_quantity', 'weight', 'dimensions', 'tags'
    ];

    const updates = [];
    const values = [];
    let paramCount = 0;

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key) && updateData[key] !== undefined) {
        paramCount++;
        updates.push(`${key} = $${paramCount}`);
        
        if (key === 'dimensions' && updateData[key]) {
          values.push(JSON.stringify(updateData[key]));
        } else {
          values.push(updateData[key]);
        }
      }
    });

    if (updates.length === 0) {
      throw new Error('No valid fields to update');
    }

    // Update in_stock based on stock_quantity
    if (updateData.stock_quantity !== undefined) {
      paramCount++;
      updates.push(`in_stock = $${paramCount}`);
      values.push(updateData.stock_quantity > 0);
    }

    paramCount++;
    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    const text = `
      UPDATE products
      SET ${updates.join(', ')}
      WHERE id = $${paramCount} AND is_active = true
      RETURNING *
    `;

    values.push(id);
    const result = await query(text, values);
    return result.rows[0];
  }

  // Update stock quantity
  static async updateStock(id, quantity, operation = 'set') {
    let text;
    let values;

    if (operation === 'set') {
      text = `
        UPDATE products
        SET stock_quantity = $1, in_stock = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
      `;
      values = [quantity, quantity > 0, id];
    } else if (operation === 'increment') {
      text = `
        UPDATE products
        SET stock_quantity = stock_quantity + $1, in_stock = (stock_quantity + $1) > 0, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
      `;
      values = [quantity, id];
    } else if (operation === 'decrement') {
      text = `
        UPDATE products
        SET stock_quantity = GREATEST(stock_quantity - $1, 0), in_stock = (stock_quantity - $1) > 0, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
      `;
      values = [quantity, id];
    } else {
      throw new Error('Invalid operation. Use "set", "increment", or "decrement"');
    }

    const result = await query(text, values);
    return result.rows[0];
  }

  // Soft delete product
  static async delete(id) {
    const text = `
      UPDATE products
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Get product categories
  static async getCategories() {
    const text = `
      SELECT category, COUNT(*) as product_count
      FROM products
      WHERE is_active = true
      GROUP BY category
      ORDER BY product_count DESC
    `;

    const result = await query(text);
    return result.rows;
  }

  // Get featured products
  static async getFeatured(limit = 10) {
    const text = `
      SELECT * FROM products
      WHERE is_active = true AND in_stock = true
      ORDER BY rating DESC, total_reviews DESC
      LIMIT $1
    `;

    const result = await query(text, [limit]);
    return result.rows;
  }

  // Get related products
  static async getRelated(productId, limit = 5) {
    const text = `
      SELECT p2.* FROM products p1
      JOIN products p2 ON p1.category = p2.category
      WHERE p1.id = $1 AND p2.id != $1 AND p2.is_active = true AND p2.in_stock = true
      ORDER BY p2.rating DESC
      LIMIT $2
    `;

    const result = await query(text, [productId, limit]);
    return result.rows;
  }

  // Update product rating
  static async updateRating(id, newRating, totalReviews) {
    const text = `
      UPDATE products
      SET rating = $1, total_reviews = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;

    const result = await query(text, [newRating, totalReviews, id]);
    return result.rows[0];
  }

  // Get low stock products
  static async getLowStock(threshold = 10) {
    const text = `
      SELECT * FROM products
      WHERE is_active = true AND stock_quantity <= $1 AND stock_quantity > 0
      ORDER BY stock_quantity ASC
    `;

    const result = await query(text, [threshold]);
    return result.rows;
  }

  // Get product statistics
  static async getStats() {
    const text = `
      SELECT 
        COUNT(*) as total_products,
        COUNT(CASE WHEN in_stock = true THEN 1 END) as in_stock_products,
        COUNT(CASE WHEN in_stock = false THEN 1 END) as out_of_stock_products,
        COUNT(DISTINCT category) as total_categories,
        COALESCE(AVG(discount_price), 0) as average_price,
        COALESCE(SUM(stock_quantity), 0) as total_stock_quantity
      FROM products
      WHERE is_active = true
    `;

    const result = await query(text);
    return result.rows[0];
  }

  // Bulk update stock
  static async bulkUpdateStock(updates) {
    return await transaction(async (client) => {
      const results = [];
      
      for (const update of updates) {
        const { id, quantity, operation = 'set' } = update;
        
        let text;
        let values;

        if (operation === 'set') {
          text = `
            UPDATE products
            SET stock_quantity = $1, in_stock = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
          `;
          values = [quantity, quantity > 0, id];
        } else if (operation === 'decrement') {
          text = `
            UPDATE products
            SET stock_quantity = GREATEST(stock_quantity - $1, 0), in_stock = (stock_quantity - $1) > 0, updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *
          `;
          values = [quantity, id];
        }

        const result = await client.query(text, values);
        results.push(result.rows[0]);
      }

      return results;
    });
  }
}

module.exports = Product; 