const { query, transaction } = require('../config/database');

class Venue {
  // Create a new venue
  static async create(venueData) {
    const {
      owner_id,
      name,
      location,
      sport_type,
      price_per_hr,
      images = [],
      amenities = [],
      description = '',
      contact_phone = '',
      contact_email = ''
    } = venueData;

    const text = `
      INSERT INTO venues (
        owner_id, name, location, sport_type, price_per_hr, 
        images, amenities, description, contact_phone, contact_email, 
        approved, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, false, NOW())
      RETURNING *
    `;

    const values = [
      owner_id, name, location, sport_type, price_per_hr,
      JSON.stringify(images), JSON.stringify(amenities),
      description, contact_phone, contact_email
    ];

    const result = await query(text, values);
    return result.rows[0];
  }

  // Find venue by ID
  static async findById(id) {
    const text = `
      SELECT 
        v.*,
        u.name as owner_name,
        u.email as owner_email
      FROM venues v
      JOIN users u ON v.owner_id = u.id
      WHERE v.id = $1 AND v.deleted_at IS NULL
    `;
    
    const result = await query(text, [id]);
    if (result.rows[0]) {
      // Parse JSON fields
      const venue = result.rows[0];
      venue.images = JSON.parse(venue.images || '[]');
      venue.amenities = JSON.parse(venue.amenities || '[]');
      return venue;
    }
    return null;
  }

  // Find all venues with filters
  static async findAll(filters = {}) {
    let text = `
      SELECT 
        v.*,
        u.name as owner_name,
        COUNT(DISTINCT s.id) as total_slots,
        COUNT(DISTINCT CASE WHEN s.is_booked = true THEN s.id END) as booked_slots
      FROM venues v
      JOIN users u ON v.owner_id = u.id
      LEFT JOIN slots s ON v.id = s.venue_id
      WHERE v.deleted_at IS NULL
    `;
    
    const values = [];
    let paramCount = 0;

    // Apply filters
    if (filters.sport_type) {
      paramCount++;
      text += ` AND v.sport_type = $${paramCount}`;
      values.push(filters.sport_type);
    }

    if (filters.location) {
      paramCount++;
      text += ` AND v.location ILIKE $${paramCount}`;
      values.push(`%${filters.location}%`);
    }

    if (filters.approved !== undefined) {
      paramCount++;
      text += ` AND v.approved = $${paramCount}`;
      values.push(filters.approved);
    }

    if (filters.owner_id) {
      paramCount++;
      text += ` AND v.owner_id = $${paramCount}`;
      values.push(filters.owner_id);
    }

    if (filters.price_min) {
      paramCount++;
      text += ` AND v.price_per_hr >= $${paramCount}`;
      values.push(filters.price_min);
    }

    if (filters.price_max) {
      paramCount++;
      text += ` AND v.price_per_hr <= $${paramCount}`;
      values.push(filters.price_max);
    }

    text += `
      GROUP BY v.id, u.name
      ORDER BY v.created_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `;

    values.push(filters.limit || 20, filters.offset || 0);

    const result = await query(text, values);
    
    // Parse JSON fields for each venue
    return result.rows.map(venue => ({
      ...venue,
      images: JSON.parse(venue.images || '[]'),
      amenities: JSON.parse(venue.amenities || '[]')
    }));
  }

  // Update venue
  static async update(id, updateData) {
    const {
      name,
      location,
      sport_type,
      price_per_hr,
      images,
      amenities,
      description,
      contact_phone,
      contact_email
    } = updateData;

    const text = `
      UPDATE venues 
      SET 
        name = $1,
        location = $2,
        sport_type = $3,
        price_per_hr = $4,
        images = $5,
        amenities = $6,
        description = $7,
        contact_phone = $8,
        contact_email = $9,
        updated_at = NOW()
      WHERE id = $10 AND deleted_at IS NULL
      RETURNING *
    `;

    const values = [
      name, location, sport_type, price_per_hr,
      JSON.stringify(images || []), JSON.stringify(amenities || []),
      description, contact_phone, contact_email, id
    ];

    const result = await query(text, values);
    if (result.rows[0]) {
      const venue = result.rows[0];
      venue.images = JSON.parse(venue.images || '[]');
      venue.amenities = JSON.parse(venue.amenities || '[]');
      return venue;
    }
    return null;
  }

  // Approve/reject venue (admin only)
  static async updateApprovalStatus(id, approved, admin_notes = '') {
    const text = `
      UPDATE venues 
      SET 
        approved = $1,
        admin_notes = $2,
        approved_at = CASE WHEN $1 = true THEN NOW() ELSE NULL END,
        updated_at = NOW()
      WHERE id = $3 AND deleted_at IS NULL
      RETURNING *
    `;

    const result = await query(text, [approved, admin_notes, id]);
    if (result.rows[0]) {
      const venue = result.rows[0];
      venue.images = JSON.parse(venue.images || '[]');
      venue.amenities = JSON.parse(venue.amenities || '[]');
      return venue;
    }
    return null;
  }

  // Delete venue (soft delete)
  static async delete(id) {
    const text = `
      UPDATE venues 
      SET deleted_at = NOW()
      WHERE id = $1
      RETURNING id
    `;

    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Get venue statistics
  static async getStats(venueId) {
    const text = `
      SELECT 
        COUNT(DISTINCT s.id) as total_slots,
        COUNT(DISTINCT CASE WHEN s.is_booked = true THEN s.id END) as booked_slots,
        COUNT(DISTINCT b.id) as total_bookings,
        COALESCE(SUM(b.amount_paid), 0) as total_revenue,
        COUNT(DISTINCT CASE WHEN b.status = 'confirmed' THEN b.id END) as confirmed_bookings
      FROM venues v
      LEFT JOIN slots s ON v.id = s.venue_id
      LEFT JOIN bookings b ON s.id = b.slot_id
      WHERE v.id = $1
      GROUP BY v.id
    `;

    const result = await query(text, [venueId]);
    return result.rows[0] || {
      total_slots: 0,
      booked_slots: 0,
      total_bookings: 0,
      total_revenue: 0,
      confirmed_bookings: 0
    };
  }

  // Search venues
  static async search(searchTerm, filters = {}) {
    let text = `
      SELECT 
        v.*,
        u.name as owner_name,
        ts_rank(to_tsvector('english', v.name || ' ' || v.location || ' ' || v.sport_type), query) as rank
      FROM venues v
      JOIN users u ON v.owner_id = u.id,
      plainto_tsquery('english', $1) query
      WHERE v.deleted_at IS NULL
      AND v.approved = true
      AND (
        to_tsvector('english', v.name || ' ' || v.location || ' ' || v.sport_type) @@ query
        OR v.name ILIKE $2
        OR v.location ILIKE $2
        OR v.sport_type ILIKE $2
      )
    `;

    const values = [searchTerm, `%${searchTerm}%`];
    let paramCount = 2;

    // Apply additional filters
    if (filters.sport_type) {
      paramCount++;
      text += ` AND v.sport_type = $${paramCount}`;
      values.push(filters.sport_type);
    }

    if (filters.location) {
      paramCount++;
      text += ` AND v.location ILIKE $${paramCount}`;
      values.push(`%${filters.location}%`);
    }

    text += ` ORDER BY rank DESC, v.created_at DESC LIMIT $${paramCount + 1}`;
    values.push(filters.limit || 20);

    const result = await query(text, values);
    
    return result.rows.map(venue => ({
      ...venue,
      images: JSON.parse(venue.images || '[]'),
      amenities: JSON.parse(venue.amenities || '[]')
    }));
  }

  // Get venues by owner
  static async findByOwner(ownerId, limit = 20, offset = 0) {
    const text = `
      SELECT 
        v.*,
        COUNT(DISTINCT s.id) as total_slots,
        COUNT(DISTINCT CASE WHEN s.is_booked = true THEN s.id END) as booked_slots
      FROM venues v
      LEFT JOIN slots s ON v.id = s.venue_id
      WHERE v.owner_id = $1 AND v.deleted_at IS NULL
      GROUP BY v.id
      ORDER BY v.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await query(text, [ownerId, limit, offset]);
    
    return result.rows.map(venue => ({
      ...venue,
      images: JSON.parse(venue.images || '[]'),
      amenities: JSON.parse(venue.amenities || '[]')
    }));
  }
}

module.exports = Venue; 