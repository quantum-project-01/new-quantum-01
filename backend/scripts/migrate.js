const { query } = require('../config/database');
require('dotenv').config();

const createTables = async () => {
  try {
    console.log('🔧 Creating database tables...');

    // Create Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'partner', 'admin')),
        phone VARCHAR(20),
        profile_image VARCHAR(500),
        email_verified BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create Venues table
    await query(`
      CREATE TABLE IF NOT EXISTS venues (
        id SERIAL PRIMARY KEY,
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        location TEXT NOT NULL,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        sport_type VARCHAR(100) NOT NULL,
        price_per_hour DECIMAL(10,2) NOT NULL,
        amenities TEXT[],
        images TEXT[],
        approved BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Venues table created');

    // Create Slots table
    await query(`
      CREATE TABLE IF NOT EXISTS slots (
        id SERIAL PRIMARY KEY,
        venue_id INTEGER REFERENCES venues(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        price_per_hour DECIMAL(10,2),
        is_booked BOOLEAN DEFAULT false,
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(venue_id, date, start_time, end_time)
      )
    `);
    console.log('✅ Slots table created');

    // Create Bookings table
    await query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        slot_id INTEGER REFERENCES slots(id) ON DELETE CASCADE,
        amount_paid DECIMAL(10,2) NOT NULL,
        payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
        payment_transaction_id VARCHAR(255),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Bookings table created');

    // Create Subscriptions table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(10) CHECK (type IN ('lite', 'pro')) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'paused')),
        auto_renew BOOLEAN DEFAULT true,
        payment_transaction_id VARCHAR(255),
        features JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Subscriptions table created');

    // Create Products table (NEW - E-commerce)
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        marked_price DECIMAL(10,2) NOT NULL,
        discount_price DECIMAL(10,2) NOT NULL,
        shipping_charges DECIMAL(10,2) DEFAULT 0,
        images TEXT[],
        in_stock BOOLEAN DEFAULT true,
        stock_quantity INTEGER DEFAULT 0,
        weight DECIMAL(8,2), -- for shipping calculation
        dimensions JSONB, -- {length, width, height}
        tags TEXT[],
        rating DECIMAL(3,2) DEFAULT 0,
        total_reviews INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Products table created');

    // Create Coupons table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255),
        description TEXT,
        discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed')) NOT NULL,
        discount_value DECIMAL(10,2) NOT NULL,
        min_cart_value DECIMAL(10,2) DEFAULT 0,
        max_discount DECIMAL(10,2), -- max discount for percentage type
        max_uses INTEGER,
        used_count INTEGER DEFAULT 0,
        valid_from DATE NOT NULL,
        valid_until DATE NOT NULL,
        applicable_to VARCHAR(20) DEFAULT 'all' CHECK (applicable_to IN ('all', 'venues', 'products', 'events')),
        user_limit_per_coupon INTEGER DEFAULT 1,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Coupons table created');

    // Create Cart Items table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      )
    `);
    console.log('✅ Cart Items table created');

    // Create Events table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        organizer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        venue_id INTEGER REFERENCES venues(id),
        location TEXT, -- if not using a venue
        price DECIMAL(10,2) NOT NULL,
        max_participants INTEGER,
        current_participants INTEGER DEFAULT 0,
        images TEXT[],
        category VARCHAR(100),
        tags TEXT[],
        requirements TEXT,
        status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
        is_public BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Events table created');

    // Create Event Bookings table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS event_bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        amount_paid DECIMAL(10,2) NOT NULL,
        payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
        payment_transaction_id VARCHAR(255),
        status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'attended')),
        booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, event_id)
      )
    `);
    console.log('✅ Event Bookings table created');

    // Create Wallets table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS wallets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
        balance DECIMAL(12,2) DEFAULT 0 CHECK (balance >= 0),
        total_earned DECIMAL(12,2) DEFAULT 0,
        total_spent DECIMAL(12,2) DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Wallets table created');

    // Create Wallet Transactions table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS wallet_transactions (
        id SERIAL PRIMARY KEY,
        wallet_id INTEGER REFERENCES wallets(id) ON DELETE CASCADE,
        transaction_type VARCHAR(20) CHECK (transaction_type IN ('credit', 'debit')) NOT NULL,
        amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
        description TEXT,
        reference_type VARCHAR(50), -- 'booking', 'refund', 'topup', 'withdrawal', 'commission'
        reference_id VARCHAR(100),
        balance_after DECIMAL(12,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Wallet Transactions table created');

    // Create Partner Plans table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS partner_plans (
        id SERIAL PRIMARY KEY,
        partner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        plan_type VARCHAR(20) CHECK (plan_type IN ('fixed_subscription', 'revenue_share')) NOT NULL,
        fixed_amount DECIMAL(10,2), -- For fixed subscription (₹5000/month/turf)
        revenue_percentage DECIMAL(5,2), -- For revenue share (e.g., 15.00 for 15%)
        start_date DATE NOT NULL,
        end_date DATE,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
        payment_frequency VARCHAR(20) DEFAULT 'monthly' CHECK (payment_frequency IN ('monthly', 'quarterly', 'yearly')),
        auto_renew BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Partner Plans table created');

    // Create Orders table (NEW - E-commerce)
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        discount_amount DECIMAL(10,2) DEFAULT 0,
        shipping_charges DECIMAL(10,2) DEFAULT 0,
        tax_amount DECIMAL(10,2) DEFAULT 0,
        coupon_code VARCHAR(50),
        payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
        order_status VARCHAR(20) DEFAULT 'placed' CHECK (order_status IN ('placed', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned')),
        shipping_address JSONB,
        billing_address JSONB,
        payment_transaction_id VARCHAR(255),
        tracking_number VARCHAR(100),
        shipped_at TIMESTAMP,
        delivered_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Orders table created');

    // Create Order Items table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        product_name VARCHAR(255) NOT NULL,
        product_price DECIMAL(10,2) NOT NULL,
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Order Items table created');

    // Create Coupon Usage table (NEW)
    await query(`
      CREATE TABLE IF NOT EXISTS coupon_usage (
        id SERIAL PRIMARY KEY,
        coupon_id INTEGER REFERENCES coupons(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        order_id INTEGER REFERENCES orders(id),
        booking_id INTEGER REFERENCES bookings(id),
        event_booking_id INTEGER REFERENCES event_bookings(id),
        discount_amount DECIMAL(10,2) NOT NULL,
        used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(coupon_id, user_id, order_id),
        UNIQUE(coupon_id, user_id, booking_id),
        UNIQUE(coupon_id, user_id, event_booking_id)
      )
    `);
    console.log('✅ Coupon Usage table created');

    // Create comprehensive indexes for better performance
    await query(`
      -- User indexes
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);

      -- Venue indexes
      CREATE INDEX IF NOT EXISTS idx_venues_owner ON venues(owner_id);
      CREATE INDEX IF NOT EXISTS idx_venues_approved ON venues(approved);
      CREATE INDEX IF NOT EXISTS idx_venues_sport_type ON venues(sport_type);
      CREATE INDEX IF NOT EXISTS idx_venues_location ON venues USING GIN(to_tsvector('english', location));
      CREATE INDEX IF NOT EXISTS idx_venues_active ON venues(is_active);

      -- Slot indexes
      CREATE INDEX IF NOT EXISTS idx_slots_venue_date ON slots(venue_id, date);
      CREATE INDEX IF NOT EXISTS idx_slots_is_booked ON slots(is_booked);
      CREATE INDEX IF NOT EXISTS idx_slots_available ON slots(is_available);

      -- Booking indexes
      CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_slot ON bookings(slot_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
      CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
      CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

      -- Subscription indexes
      CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date ON subscriptions(end_date);

      -- Product indexes
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
      CREATE INDEX IF NOT EXISTS idx_products_stock ON products(in_stock);
      CREATE INDEX IF NOT EXISTS idx_products_name ON products USING GIN(to_tsvector('english', name));

      -- Cart indexes
      CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);
      CREATE INDEX IF NOT EXISTS idx_cart_product ON cart_items(product_id);

      -- Event indexes
      CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer_id);
      CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
      CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
      CREATE INDEX IF NOT EXISTS idx_events_public ON events(is_public);

      -- Event booking indexes
      CREATE INDEX IF NOT EXISTS idx_event_bookings_user ON event_bookings(user_id);
      CREATE INDEX IF NOT EXISTS idx_event_bookings_event ON event_bookings(event_id);
      CREATE INDEX IF NOT EXISTS idx_event_bookings_status ON event_bookings(status);

      -- Wallet indexes
      CREATE INDEX IF NOT EXISTS idx_wallets_user ON wallets(user_id);
      CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet ON wallet_transactions(wallet_id);
      CREATE INDEX IF NOT EXISTS idx_wallet_transactions_type ON wallet_transactions(transaction_type);
      CREATE INDEX IF NOT EXISTS idx_wallet_transactions_reference ON wallet_transactions(reference_type, reference_id);

      -- Partner plan indexes
      CREATE INDEX IF NOT EXISTS idx_partner_plans_partner ON partner_plans(partner_id);
      CREATE INDEX IF NOT EXISTS idx_partner_plans_status ON partner_plans(status);

      -- Order indexes
      CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
      CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
      CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

      -- Coupon indexes
      CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
      CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
      CREATE INDEX IF NOT EXISTS idx_coupons_valid_dates ON coupons(valid_from, valid_until);
    `);
    console.log('✅ Database indexes created');

    // Create triggers for updated_at timestamps
    await query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- Add triggers to all tables with updated_at
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_venues_updated_at ON venues;
      CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
      CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
      CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_products_updated_at ON products;
      CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_events_updated_at ON events;
      CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_wallets_updated_at ON wallets;
      CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_partner_plans_updated_at ON partner_plans;
      CREATE TRIGGER update_partner_plans_updated_at BEFORE UPDATE ON partner_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
      CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_coupons_updated_at ON coupons;
      CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log('✅ Database triggers created');

    console.log('\n🎉 All database tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
};

const dropTables = async () => {
  try {
    console.log('🗑️  Dropping all tables...');
    
    await query(`
      DROP TABLE IF EXISTS coupon_usage CASCADE;
      DROP TABLE IF EXISTS order_items CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS partner_plans CASCADE;
      DROP TABLE IF EXISTS wallet_transactions CASCADE;
      DROP TABLE IF EXISTS wallets CASCADE;
      DROP TABLE IF EXISTS event_bookings CASCADE;
      DROP TABLE IF EXISTS events CASCADE;
      DROP TABLE IF EXISTS cart_items CASCADE;
      DROP TABLE IF EXISTS coupons CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS subscriptions CASCADE;
      DROP TABLE IF EXISTS bookings CASCADE;
      DROP TABLE IF EXISTS slots CASCADE;
      DROP TABLE IF EXISTS venues CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      
      DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
    `);
    
    console.log('✅ All tables dropped successfully!');
  } catch (error) {
    console.error('❌ Error dropping tables:', error);
    throw error;
  }
};

const main = async () => {
  try {
    const command = process.argv[2];
    
    if (command === 'drop') {
      await dropTables();
    } else {
      await createTables();
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if called directly
if (require.main === module) {
  main();
}

module.exports = { createTables, dropTables }; 