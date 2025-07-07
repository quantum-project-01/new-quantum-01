const { query, transaction } = require('../config/database');

class Booking {
  // Create a new booking
  static async create(bookingData) {
    const { user_id, slot_id, amount_paid, payment_status = 'pending' } = bookingData;

    const text = `
      INSERT INTO bookings (user_id, slot_id, amount_paid, payment_status, status, created_at)
      VALUES ($1, $2, $3, $4, 'pending', NOW())
      RETURNING *
    `;

    const values = [user_id, slot_id, amount_paid, payment_status];
    const result = await query(text, values);
    return result.rows[0];
  }

  // Find booking by ID with details
  static async findById(id) {
    const text = `
      SELECT 
        b.*,
        u.name as user_name,
        u.email as user_email,
        v.name as venue_name,
        v.location,
        v.sport_type,
        s.date as slot_date,
        s.start_time,
        s.end_time
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN slots s ON b.slot_id = s.id
      JOIN venues v ON s.venue_id = v.id
      WHERE b.id = $1
    `;

    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Update booking status
  static async updateStatus(id, status) {
    const text = `
      UPDATE bookings 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const result = await query(text, [status, id]);
    return result.rows[0];
  }

  // Update payment status
  static async updatePaymentStatus(id, paymentStatus, transactionId = null) {
    const text = `
      UPDATE bookings 
      SET payment_status = $1, payment_transaction_id = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;

    const result = await query(text, [paymentStatus, transactionId, id]);
    return result.rows[0];
  }

  // Get user's bookings
  static async findByUser(userId, limit = 20, offset = 0) {
    const text = `
      SELECT 
        b.*,
        v.name as venue_name,
        v.location,
        v.sport_type,
        s.date as slot_date,
        s.start_time,
        s.end_time
      FROM bookings b
      JOIN slots s ON b.slot_id = s.id
      JOIN venues v ON s.venue_id = v.id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await query(text, [userId, limit, offset]);
    return result.rows;
  }

  // Get venue owner's bookings
  static async findByVenueOwner(ownerId, limit = 20, offset = 0) {
    const text = `
      SELECT 
        b.*,
        u.name as user_name,
        u.email as user_email,
        v.name as venue_name,
        v.location,
        s.date as slot_date,
        s.start_time,
        s.end_time
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN slots s ON b.slot_id = s.id
      JOIN venues v ON s.venue_id = v.id
      WHERE v.owner_id = $1
      ORDER BY b.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await query(text, [ownerId, limit, offset]);
    return result.rows;
  }

  // Get all bookings (admin)
  static async findAll(filters = {}) {
    let text = `
      SELECT 
        b.*,
        u.name as user_name,
        u.email as user_email,
        v.name as venue_name,
        v.location,
        s.date as slot_date,
        s.start_time,
        s.end_time
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN slots s ON b.slot_id = s.id
      JOIN venues v ON s.venue_id = v.id
      WHERE 1=1
    `;

    const values = [];
    let paramCount = 0;

    if (filters.status) {
      paramCount++;
      text += ` AND b.status = $${paramCount}`;
      values.push(filters.status);
    }

    if (filters.payment_status) {
      paramCount++;
      text += ` AND b.payment_status = $${paramCount}`;
      values.push(filters.payment_status);
    }

    if (filters.date_from) {
      paramCount++;
      text += ` AND s.date >= $${paramCount}`;
      values.push(filters.date_from);
    }

    if (filters.date_to) {
      paramCount++;
      text += ` AND s.date <= $${paramCount}`;
      values.push(filters.date_to);
    }

    text += ` ORDER BY b.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    values.push(filters.limit || 20, filters.offset || 0);

    const result = await query(text, values);
    return result.rows;
  }

  // Cancel booking
  static async cancel(id) {
    return await transaction(async (client) => {
      // Get booking details
      const bookingResult = await client.query(
        'SELECT * FROM bookings WHERE id = $1',
        [id]
      );

      if (bookingResult.rows.length === 0) {
        throw new Error('Booking not found');
      }

      const booking = bookingResult.rows[0];

      // Update booking status
      await client.query(
        'UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2',
        ['cancelled', id]
      );

      // Free up the slot
      await client.query(
        'UPDATE slots SET is_booked = false WHERE id = $1',
        [booking.slot_id]
      );

      return booking;
    });
  }

  // Get booking statistics
  static async getStats(filters = {}) {
    let text = `
      SELECT 
        COUNT(*) as total_bookings,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_bookings,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_bookings,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_bookings,
        COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as paid_bookings,
        COALESCE(SUM(amount_paid), 0) as total_revenue,
        COALESCE(SUM(CASE WHEN payment_status = 'paid' THEN amount_paid ELSE 0 END), 0) as confirmed_revenue
      FROM bookings b
      JOIN slots s ON b.slot_id = s.id
      WHERE 1=1
    `;

    const values = [];
    let paramCount = 0;

    if (filters.date_from) {
      paramCount++;
      text += ` AND s.date >= $${paramCount}`;
      values.push(filters.date_from);
    }

    if (filters.date_to) {
      paramCount++;
      text += ` AND s.date <= $${paramCount}`;
      values.push(filters.date_to);
    }

    if (filters.venue_id) {
      paramCount++;
      text += ` AND s.venue_id = $${paramCount}`;
      values.push(filters.venue_id);
    }

    const result = await query(text, values);
    return result.rows[0];
  }
}

module.exports = Booking; 