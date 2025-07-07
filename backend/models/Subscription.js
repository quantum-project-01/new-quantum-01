const { query, transaction } = require('../config/database');

class Subscription {
  // Create a new subscription
  static async create(subscriptionData) {
    const {
      user_id,
      type,
      price,
      start_date,
      end_date,
      payment_transaction_id,
      features = {}
    } = subscriptionData;

    const text = `
      INSERT INTO subscriptions (user_id, type, price, start_date, end_date, payment_transaction_id, features, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'active')
      RETURNING *
    `;

    const values = [user_id, type, price, start_date, end_date, payment_transaction_id, JSON.stringify(features)];
    const result = await query(text, values);
    return result.rows[0];
  }

  // Find subscription by ID
  static async findById(id) {
    const text = `
      SELECT s.*, u.name as user_name, u.email as user_email
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = $1
    `;

    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Get user's active subscription
  static async findActiveByUser(userId) {
    const text = `
      SELECT * FROM subscriptions
      WHERE user_id = $1 
      AND status = 'active'
      AND end_date >= CURRENT_DATE
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const result = await query(text, [userId]);
    return result.rows[0];
  }

  // Get user's subscription history
  static async findByUser(userId, limit = 20, offset = 0) {
    const text = `
      SELECT * FROM subscriptions
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await query(text, [userId, limit, offset]);
    return result.rows;
  }

  // Update subscription status
  static async updateStatus(id, status) {
    const text = `
      UPDATE subscriptions
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;

    const result = await query(text, [status, id]);
    return result.rows[0];
  }

  // Cancel subscription
  static async cancel(id, reason = null) {
    return await transaction(async (client) => {
      // Update subscription status
      const subscriptionResult = await client.query(
        'UPDATE subscriptions SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        ['cancelled', id]
      );

      const subscription = subscriptionResult.rows[0];
      if (!subscription) {
        throw new Error('Subscription not found');
      }

      // Log cancellation reason if provided
      if (reason) {
        await client.query(
          'INSERT INTO subscription_logs (subscription_id, action, details, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)',
          [id, 'cancelled', JSON.stringify({ reason })]
        );
      }

      return subscription;
    });
  }

  // Renew subscription
  static async renew(subscriptionId, newEndDate, paymentTransactionId) {
    const text = `
      UPDATE subscriptions
      SET end_date = $1, payment_transaction_id = $2, status = 'active', updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;

    const result = await query(text, [newEndDate, paymentTransactionId, subscriptionId]);
    return result.rows[0];
  }

  // Get expiring subscriptions (for notifications)
  static async findExpiring(days = 7) {
    const text = `
      SELECT s.*, u.name as user_name, u.email as user_email
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.status = 'active'
      AND s.end_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '${days} days'
      ORDER BY s.end_date ASC
    `;

    const result = await query(text);
    return result.rows;
  }

  // Get subscription statistics
  static async getStats(filters = {}) {
    let text = `
      SELECT 
        COUNT(*) as total_subscriptions,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_subscriptions,
        COUNT(CASE WHEN status = 'expired' THEN 1 END) as expired_subscriptions,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_subscriptions,
        COUNT(CASE WHEN type = 'lite' THEN 1 END) as lite_subscriptions,
        COUNT(CASE WHEN type = 'pro' THEN 1 END) as pro_subscriptions,
        COALESCE(SUM(price), 0) as total_revenue,
        COALESCE(SUM(CASE WHEN status = 'active' THEN price ELSE 0 END), 0) as active_revenue,
        COALESCE(AVG(price), 0) as average_price
      FROM subscriptions
      WHERE 1=1
    `;

    const values = [];
    let paramCount = 0;

    if (filters.date_from) {
      paramCount++;
      text += ` AND created_at >= $${paramCount}`;
      values.push(filters.date_from);
    }

    if (filters.date_to) {
      paramCount++;
      text += ` AND created_at <= $${paramCount}`;
      values.push(filters.date_to);
    }

    if (filters.type) {
      paramCount++;
      text += ` AND type = $${paramCount}`;
      values.push(filters.type);
    }

    const result = await query(text, values);
    return result.rows[0];
  }

  // Get all subscriptions with pagination and filters
  static async findAll(filters = {}) {
    let text = `
      SELECT 
        s.*,
        u.name as user_name,
        u.email as user_email
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE 1=1
    `;

    const values = [];
    let paramCount = 0;

    if (filters.status) {
      paramCount++;
      text += ` AND s.status = $${paramCount}`;
      values.push(filters.status);
    }

    if (filters.type) {
      paramCount++;
      text += ` AND s.type = $${paramCount}`;
      values.push(filters.type);
    }

    if (filters.user_id) {
      paramCount++;
      text += ` AND s.user_id = $${paramCount}`;
      values.push(filters.user_id);
    }

    if (filters.date_from) {
      paramCount++;
      text += ` AND s.created_at >= $${paramCount}`;
      values.push(filters.date_from);
    }

    if (filters.date_to) {
      paramCount++;
      text += ` AND s.created_at <= $${paramCount}`;
      values.push(filters.date_to);
    }

    text += ` ORDER BY s.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    values.push(filters.limit || 20, filters.offset || 0);

    const result = await query(text, values);
    return result.rows;
  }

  // Check if user has active subscription
  static async hasActiveSubscription(userId) {
    const subscription = await this.findActiveByUser(userId);
    return !!subscription;
  }

  // Get subscription features based on type
  static getSubscriptionFeatures(type) {
    const features = {
      lite: {
        max_bookings_per_month: 10,
        advance_booking_days: 7,
        cancellation_hours: 24,
        priority_support: false,
        discount_percentage: 5,
        features: [
          'Up to 10 bookings per month',
          'Book 7 days in advance',
          '24-hour cancellation',
          '5% discount on bookings',
          'Basic customer support'
        ]
      },
      pro: {
        max_bookings_per_month: -1, // unlimited
        advance_booking_days: 30,
        cancellation_hours: 2,
        priority_support: true,
        discount_percentage: 15,
        features: [
          'Unlimited bookings',
          'Book 30 days in advance',
          '2-hour cancellation',
          '15% discount on bookings',
          'Priority customer support',
          'Exclusive venue access',
          'Event creation privileges'
        ]
      }
    };

    return features[type] || null;
  }

  // Get subscription pricing
  static getSubscriptionPricing() {
    return {
      lite: {
        monthly: 5500,
        quarterly: 15000, // 9% discount
        yearly: 55000 // 17% discount
      },
      pro: {
        monthly: 11000,
        quarterly: 30000, // 9% discount
        yearly: 110000 // 17% discount
      }
    };
  }
}

module.exports = Subscription; 