const { query, transaction } = require('../config/database');
const Subscription = require('../models/Subscription');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// Test colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Test Database Connection
async function testDatabaseConnection() {
  try {
    log('\n🔍 Testing Database Connection...', 'blue');
    const result = await query('SELECT NOW() as current_time');
    log(`✅ Database connected successfully at ${result.rows[0].current_time}`, 'green');
    return true;
  } catch (error) {
    log(`❌ Database connection failed: ${error.message}`, 'red');
    return false;
  }
}

// Test Table Creation
async function testTableCreation() {
  try {
    log('\n🔍 Testing Table Creation...', 'blue');
    
    const tables = [
      'users', 'venues', 'slots', 'bookings', 
      'subscriptions', 'products', 'coupons', 'cart_items',
      'events', 'event_bookings', 'wallets', 'wallet_transactions',
      'partner_plans', 'orders', 'order_items', 'coupon_usage'
    ];

    for (const table of tables) {
      const result = await query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )
      `, [table]);

      if (result.rows[0].exists) {
        log(`✅ Table '${table}' exists`, 'green');
      } else {
        log(`❌ Table '${table}' missing`, 'red');
        return false;
      }
    }

    log('✅ All required tables exist', 'green');
    return true;
  } catch (error) {
    log(`❌ Table creation test failed: ${error.message}`, 'red');
    return false;
  }
}

// Test Subscription Features
async function testSubscriptionFeatures() {
  try {
    log('\n🔍 Testing Subscription Features...', 'blue');

    // Test subscription pricing
    const pricing = Subscription.getSubscriptionPricing();
    log(`✅ Subscription pricing loaded: Lite(₹${pricing.lite.monthly}), Pro(₹${pricing.pro.monthly})`, 'green');

    // Test subscription features
    const liteFeatures = Subscription.getSubscriptionFeatures('lite');
    const proFeatures = Subscription.getSubscriptionFeatures('pro');
    
    log(`✅ Lite features: ${liteFeatures.features.length} features`, 'green');
    log(`✅ Pro features: ${proFeatures.features.length} features`, 'green');

    // Test database operations (requires test user)
    const testUser = await query('SELECT id FROM users LIMIT 1');
    if (testUser.rows.length > 0) {
      const userId = testUser.rows[0].id;
      
      // Test creating subscription
      const subscription = await Subscription.create({
        user_id: userId,
        type: 'lite',
        price: 5500,
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        payment_transaction_id: 'test_txn_' + Date.now()
      });

      log(`✅ Subscription created with ID: ${subscription.id}`, 'green');

      // Test finding active subscription
      const activeSubscription = await Subscription.findActiveByUser(userId);
      log(`✅ Active subscription found: ${activeSubscription ? 'Yes' : 'No'}`, 'green');

      // Clean up test data
      await query('DELETE FROM subscriptions WHERE id = $1', [subscription.id]);
    }

    return true;
  } catch (error) {
    log(`❌ Subscription features test failed: ${error.message}`, 'red');
    return false;
  }
}

// Test E-commerce Features
async function testEcommerceFeatures() {
  try {
    log('\n🔍 Testing E-commerce Features...', 'blue');

    // Test product creation
    const product = await Product.create({
      name: 'Test Sports Equipment',
      description: 'Test product for sports',
      category: 'Sports Equipment',
      marked_price: 1000,
      discount_price: 800,
      shipping_charges: 50,
      images: ['test-image.jpg'],
      stock_quantity: 10,
      tags: ['sports', 'equipment', 'test']
    });

    log(`✅ Product created with ID: ${product.id}`, 'green');

    // Test product search
    const searchResults = await Product.search('sports', 10, 0);
    log(`✅ Product search returned ${searchResults.length} results`, 'green');

    // Test product categories
    const categories = await Product.getCategories();
    log(`✅ Product categories loaded: ${categories.length} categories`, 'green');

    // Test cart functionality (requires test user)
    const testUser = await query('SELECT id FROM users LIMIT 1');
    if (testUser.rows.length > 0) {
      const userId = testUser.rows[0].id;

      // Test adding to cart
      const cartItem = await Cart.addItem(userId, product.id, 2);
      log(`✅ Item added to cart: ${cartItem.quantity} units`, 'green');

      // Test cart totals
      const cartTotals = await Cart.getCartTotals(userId);
      log(`✅ Cart totals calculated: ₹${cartTotals.total}`, 'green');

      // Test cart item count
      const itemCount = await Cart.getCartItemCount(userId);
      log(`✅ Cart item count: ${itemCount}`, 'green');

      // Clean up test data
      await Cart.clearCart(userId);
    }

    // Clean up test product
    await Product.delete(product.id);

    return true;
  } catch (error) {
    log(`❌ E-commerce features test failed: ${error.message}`, 'red');
    return false;
  }
}

// Test Coupon System
async function testCouponSystem() {
  try {
    log('\n🔍 Testing Coupon System...', 'blue');

    // Test coupon creation
    const coupon = await query(`
      INSERT INTO coupons (code, name, discount_type, discount_value, min_cart_value, valid_from, valid_until)
      VALUES ('TEST10', 'Test Coupon', 'percentage', 10, 100, CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days')
      RETURNING *
    `);

    log(`✅ Coupon created: ${coupon.rows[0].code}`, 'green');

    // Test coupon validation
    const testUser = await query('SELECT id FROM users LIMIT 1');
    if (testUser.rows.length > 0) {
      const userId = testUser.rows[0].id;
      const validation = await Cart.validateCoupon('TEST10', 500, userId);
      log(`✅ Coupon validation: ${validation.valid ? 'Valid' : 'Invalid'}`, 'green');
    }

    // Clean up test coupon
    await query('DELETE FROM coupons WHERE code = $1', ['TEST10']);

    return true;
  } catch (error) {
    log(`❌ Coupon system test failed: ${error.message}`, 'red');
    return false;
  }
}

// Test Wallet System
async function testWalletSystem() {
  try {
    log('\n🔍 Testing Wallet System...', 'blue');

    const testUser = await query('SELECT id FROM users LIMIT 1');
    if (testUser.rows.length > 0) {
      const userId = testUser.rows[0].id;

      // Test wallet creation
      const wallet = await query(`
        INSERT INTO wallets (user_id, balance) VALUES ($1, 1000)
        ON CONFLICT (user_id) DO UPDATE SET balance = 1000
        RETURNING *
      `, [userId]);

      log(`✅ Wallet created/updated: Balance ₹${wallet.rows[0].balance}`, 'green');

      // Test wallet transaction
      const transaction = await query(`
        INSERT INTO wallet_transactions (wallet_id, transaction_type, amount, description, balance_after)
        VALUES ($1, 'credit', 500, 'Test credit', 1500)
        RETURNING *
      `, [wallet.rows[0].id]);

      log(`✅ Wallet transaction recorded: ₹${transaction.rows[0].amount}`, 'green');

      // Clean up test data
      await query('DELETE FROM wallet_transactions WHERE wallet_id = $1', [wallet.rows[0].id]);
      await query('DELETE FROM wallets WHERE user_id = $1', [userId]);
    }

    return true;
  } catch (error) {
    log(`❌ Wallet system test failed: ${error.message}`, 'red');
    return false;
  }
}

// Test Event System
async function testEventSystem() {
  try {
    log('\n🔍 Testing Event System...', 'blue');

    const testUser = await query('SELECT id FROM users LIMIT 1');
    if (testUser.rows.length > 0) {
      const userId = testUser.rows[0].id;

      // Test event creation
      const event = await query(`
        INSERT INTO events (organizer_id, title, description, event_date, start_time, end_time, price, max_participants)
        VALUES ($1, 'Test Sports Event', 'Test event description', CURRENT_DATE + INTERVAL '7 days', '10:00', '12:00', 500, 20)
        RETURNING *
      `, [userId]);

      log(`✅ Event created: ${event.rows[0].title}`, 'green');

      // Test event booking
      const booking = await query(`
        INSERT INTO event_bookings (user_id, event_id, amount_paid)
        VALUES ($1, $2, 500)
        RETURNING *
      `, [userId, event.rows[0].id]);

      log(`✅ Event booking created: ID ${booking.rows[0].id}`, 'green');

      // Clean up test data
      await query('DELETE FROM event_bookings WHERE id = $1', [booking.rows[0].id]);
      await query('DELETE FROM events WHERE id = $1', [event.rows[0].id]);
    }

    return true;
  } catch (error) {
    log(`❌ Event system test failed: ${error.message}`, 'red');
    return false;
  }
}

// Test Partner Plans
async function testPartnerPlans() {
  try {
    log('\n🔍 Testing Partner Plans...', 'blue');

    const testPartner = await query('SELECT id FROM users WHERE role = $1 LIMIT 1', ['partner']);
    if (testPartner.rows.length > 0) {
      const partnerId = testPartner.rows[0].id;

      // Test partner plan creation
      const plan = await query(`
        INSERT INTO partner_plans (partner_id, plan_type, fixed_amount, start_date)
        VALUES ($1, 'fixed_subscription', 5000, CURRENT_DATE)
        RETURNING *
      `, [partnerId]);

      log(`✅ Partner plan created: ${plan.rows[0].plan_type}`, 'green');

      // Clean up test data
      await query('DELETE FROM partner_plans WHERE id = $1', [plan.rows[0].id]);
    } else {
      log('⚠️  No partner users found, skipping partner plan test', 'yellow');
    }

    return true;
  } catch (error) {
    log(`❌ Partner plans test failed: ${error.message}`, 'red');
    return false;
  }
}

// Test Order System
async function testOrderSystem() {
  try {
    log('\n🔍 Testing Order System...', 'blue');

    const testUser = await query('SELECT id FROM users LIMIT 1');
    if (testUser.rows.length > 0) {
      const userId = testUser.rows[0].id;

      // Test order creation
      const order = await query(`
        INSERT INTO orders (user_id, order_number, total_amount, shipping_address, billing_address)
        VALUES ($1, $2, 1000, $3, $4)
        RETURNING *
      `, [
        userId,
        'ORD-' + Date.now(),
        JSON.stringify({ address: 'Test Address', city: 'Test City', pincode: '123456' }),
        JSON.stringify({ address: 'Test Address', city: 'Test City', pincode: '123456' })
      ]);

      log(`✅ Order created: ${order.rows[0].order_number}`, 'green');

      // Test order item creation
      const orderItem = await query(`
        INSERT INTO order_items (order_id, product_name, product_price, quantity, total_price)
        VALUES ($1, 'Test Product', 500, 2, 1000)
        RETURNING *
      `, [order.rows[0].id]);

      log(`✅ Order item created: ${orderItem.rows[0].product_name}`, 'green');

      // Clean up test data
      await query('DELETE FROM order_items WHERE id = $1', [orderItem.rows[0].id]);
      await query('DELETE FROM orders WHERE id = $1', [order.rows[0].id]);
    }

    return true;
  } catch (error) {
    log(`❌ Order system test failed: ${error.message}`, 'red');
    return false;
  }
}

// Main test runner
async function runAllTests() {
  log('🚀 Starting Quantum Platform Feature Tests', 'bold');
  log('=' * 50, 'blue');

  const tests = [
    { name: 'Database Connection', fn: testDatabaseConnection },
    { name: 'Table Creation', fn: testTableCreation },
    { name: 'Subscription Features', fn: testSubscriptionFeatures },
    { name: 'E-commerce Features', fn: testEcommerceFeatures },
    { name: 'Coupon System', fn: testCouponSystem },
    { name: 'Wallet System', fn: testWalletSystem },
    { name: 'Event System', fn: testEventSystem },
    { name: 'Partner Plans', fn: testPartnerPlans },
    { name: 'Order System', fn: testOrderSystem }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      log(`❌ ${test.name} failed with error: ${error.message}`, 'red');
      failed++;
    }
  }

  log('\n' + '=' * 50, 'blue');
  log(`📊 Test Results: ${passed} passed, ${failed} failed`, 'bold');
  
  if (failed === 0) {
    log('🎉 All tests passed! Your Quantum platform is ready!', 'green');
  } else {
    log(`⚠️  ${failed} tests failed. Please check the errors above.`, 'yellow');
  }

  process.exit(failed === 0 ? 0 : 1);
}

// Run tests if called directly
if (require.main === module) {
  runAllTests().catch(error => {
    log(`❌ Test runner failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { runAllTests }; 