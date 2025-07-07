const { query, transaction } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create a new user
  static async create(userData) {
    const { name, email, password, role = 'user' } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);
    
    const text = `
      INSERT INTO users (name, email, password_hash, role, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id, name, email, role, created_at
    `;
    
    const values = [name, email, password_hash, role];
    const result = await query(text, values);
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const result = await query(text, [email]);
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const text = `
      SELECT id, name, email, role, created_at, updated_at
      FROM users WHERE id = $1
    `;
    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Find user by ID with password (for authentication)
  static async findByIdWithPassword(id) {
    const text = 'SELECT * FROM users WHERE id = $1';
    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Update user profile
  static async updateProfile(id, updateData) {
    const { name, email } = updateData;
    const text = `
      UPDATE users 
      SET name = $1, email = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING id, name, email, role, created_at, updated_at
    `;
    
    const values = [name, email, id];
    const result = await query(text, values);
    return result.rows[0];
  }

  // Update password
  static async updatePassword(id, newPassword) {
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(newPassword, salt);
    
    const text = `
      UPDATE users 
      SET password_hash = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id
    `;
    
    const result = await query(text, [password_hash, id]);
    return result.rows[0];
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Get user's booking history
  static async getBookingHistory(userId) {
    const text = `
      SELECT 
        b.id as booking_id,
        b.amount_paid,
        b.payment_status,
        b.status,
        b.created_at as booking_date,
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
    `;
    
    const result = await query(text, [userId]);
    return result.rows;
  }

  // Get all users (admin only)
  static async findAll(limit = 50, offset = 0) {
    const text = `
      SELECT id, name, email, role, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    
    const result = await query(text, [limit, offset]);
    return result.rows;
  }

  // Update user role (admin only)
  static async updateRole(id, role) {
    const text = `
      UPDATE users 
      SET role = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, name, email, role, updated_at
    `;
    
    const result = await query(text, [role, id]);
    return result.rows[0];
  }

  // Delete user (soft delete)
  static async delete(id) {
    const text = `
      UPDATE users 
      SET deleted_at = NOW()
      WHERE id = $1
      RETURNING id
    `;
    
    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Check if email exists
  static async emailExists(email, excludeId = null) {
    let text = 'SELECT id FROM users WHERE email = $1';
    let values = [email];
    
    if (excludeId) {
      text += ' AND id != $2';
      values.push(excludeId);
    }
    
    const result = await query(text, values);
    return result.rows.length > 0;
  }
}

module.exports = User; 