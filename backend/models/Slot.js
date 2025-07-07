const { query, transaction } = require('../config/database');

class Slot {
  // Create a new slot
  static async create(slotData) {
    const { venue_id, date, start_time, end_time } = slotData;

    const text = `
      INSERT INTO slots (venue_id, date, start_time, end_time, is_booked, created_at)
      VALUES ($1, $2, $3, $4, false, NOW())
      RETURNING *
    `;

    const values = [venue_id, date, start_time, end_time];
    const result = await query(text, values);
    return result.rows[0];
  }

  // Create multiple slots (bulk operation)
  static async createBulk(slotsData) {
    return await transaction(async (client) => {
      const createdSlots = [];
      
      for (const slotData of slotsData) {
        const { venue_id, date, start_time, end_time } = slotData;
        
        const text = `
          INSERT INTO slots (venue_id, date, start_time, end_time, is_booked, created_at)
          VALUES ($1, $2, $3, $4, false, NOW())
          RETURNING *
        `;
        
        const values = [venue_id, date, start_time, end_time];
        const result = await client.query(text, values);
        createdSlots.push(result.rows[0]);
      }
      
      return createdSlots;
    });
  }

  // Find slot by ID
  static async findById(id) {
    const text = `
      SELECT 
        s.*,
        v.name as venue_name,
        v.location,
        v.sport_type,
        v.price_per_hr
      FROM slots s
      JOIN venues v ON s.venue_id = v.id
      WHERE s.id = $1
    `;
    
    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Find available slots for a venue
  static async findAvailableSlots(venueId, date = null, limit = 50) {
    let text = `
      SELECT 
        s.*,
        v.name as venue_name,
        v.price_per_hr
      FROM slots s
      JOIN venues v ON s.venue_id = v.id
      WHERE s.venue_id = $1 
      AND s.is_booked = false
      AND s.date >= CURRENT_DATE
    `;
    
    const values = [venueId];
    let paramCount = 1;

    if (date) {
      paramCount++;
      text += ` AND s.date = $${paramCount}`;
      values.push(date);
    }

    text += ` ORDER BY s.date, s.start_time LIMIT $${paramCount + 1}`;
    values.push(limit);

    const result = await query(text, values);
    return result.rows;
  }

  // Find slots by venue and date range
  static async findByVenueAndDateRange(venueId, startDate, endDate) {
    const text = `
      SELECT 
        s.*,
        b.id as booking_id,
        b.user_id,
        b.status as booking_status,
        u.name as user_name
      FROM slots s
      LEFT JOIN bookings b ON s.id = b.slot_id
      LEFT JOIN users u ON b.user_id = u.id
      WHERE s.venue_id = $1 
      AND s.date >= $2 
      AND s.date <= $3
      ORDER BY s.date, s.start_time
    `;

    const result = await query(text, [venueId, startDate, endDate]);
    return result.rows;
  }

  // Book a slot
  static async bookSlot(slotId, userId, bookingData) {
    return await transaction(async (client) => {
      // First, check if slot is available
      const slotCheck = await client.query(
        'SELECT * FROM slots WHERE id = $1 AND is_booked = false FOR UPDATE',
        [slotId]
      );

      if (slotCheck.rows.length === 0) {
        throw new Error('Slot is not available for booking');
      }

      const slot = slotCheck.rows[0];

      // Mark slot as booked
      await client.query(
        'UPDATE slots SET is_booked = true WHERE id = $1',
        [slotId]
      );

      // Create booking record
      const { amount_paid, payment_status = 'pending' } = bookingData;
      const bookingResult = await client.query(
        `INSERT INTO bookings (user_id, slot_id, amount_paid, payment_status, status, created_at)
         VALUES ($1, $2, $3, $4, 'pending', NOW())
         RETURNING *`,
        [userId, slotId, amount_paid, payment_status]
      );

      return {
        slot,
        booking: bookingResult.rows[0]
      };
    });
  }

  // Cancel booking (free up slot)
  static async cancelBooking(slotId, bookingId) {
    return await transaction(async (client) => {
      // Update booking status
      await client.query(
        'UPDATE bookings SET status = $1 WHERE id = $2',
        ['cancelled', bookingId]
      );

      // Free up the slot
      await client.query(
        'UPDATE slots SET is_booked = false WHERE id = $1',
        [slotId]
      );

      return true;
    });
  }

  // Update slot
  static async update(id, updateData) {
    const { date, start_time, end_time } = updateData;

    const text = `
      UPDATE slots 
      SET date = $1, start_time = $2, end_time = $3, updated_at = NOW()
      WHERE id = $4 AND is_booked = false
      RETURNING *
    `;

    const values = [date, start_time, end_time, id];
    const result = await query(text, values);
    return result.rows[0];
  }

  // Delete slot (only if not booked)
  static async delete(id) {
    const text = `
      DELETE FROM slots 
      WHERE id = $1 AND is_booked = false
      RETURNING id
    `;

    const result = await query(text, [id]);
    return result.rows[0];
  }

  // Get slot statistics for a venue
  static async getVenueSlotStats(venueId) {
    const text = `
      SELECT 
        COUNT(*) as total_slots,
        COUNT(CASE WHEN is_booked = true THEN 1 END) as booked_slots,
        COUNT(CASE WHEN is_booked = false AND date >= CURRENT_DATE THEN 1 END) as available_slots,
        COUNT(CASE WHEN date < CURRENT_DATE THEN 1 END) as past_slots
      FROM slots
      WHERE venue_id = $1
    `;

    const result = await query(text, [venueId]);
    return result.rows[0];
  }

  // Check for slot conflicts
  static async checkConflicts(venueId, date, startTime, endTime, excludeId = null) {
    let text = `
      SELECT id FROM slots 
      WHERE venue_id = $1 
      AND date = $2 
      AND (
        (start_time <= $3 AND end_time > $3) OR
        (start_time < $4 AND end_time >= $4) OR
        (start_time >= $3 AND end_time <= $4)
      )
    `;
    
    const values = [venueId, date, startTime, endTime];

    if (excludeId) {
      text += ' AND id != $5';
      values.push(excludeId);
    }

    const result = await query(text, values);
    return result.rows.length > 0;
  }

  // Get upcoming bookings for a venue
  static async getUpcomingBookings(venueId, limit = 20) {
    const text = `
      SELECT 
        s.*,
        b.id as booking_id,
        b.user_id,
        b.amount_paid,
        b.payment_status,
        b.status as booking_status,
        b.created_at as booking_date,
        u.name as user_name,
        u.email as user_email
      FROM slots s
      JOIN bookings b ON s.id = b.slot_id
      JOIN users u ON b.user_id = u.id
      WHERE s.venue_id = $1 
      AND s.date >= CURRENT_DATE
      AND s.is_booked = true
      ORDER BY s.date, s.start_time
      LIMIT $2
    `;

    const result = await query(text, [venueId, limit]);
    return result.rows;
  }

  // Generate time slots for a venue
  static async generateTimeSlots(venueId, date, startHour, endHour, slotDuration = 1) {
    const slots = [];
    
    for (let hour = startHour; hour < endHour; hour += slotDuration) {
      const startTime = `${hour.toString().padStart(2, '0')}:00:00`;
      const endTime = `${(hour + slotDuration).toString().padStart(2, '0')}:00:00`;
      
      // Check if slot already exists
      const existingSlot = await query(
        'SELECT id FROM slots WHERE venue_id = $1 AND date = $2 AND start_time = $3',
        [venueId, date, startTime]
      );
      
      if (existingSlot.rows.length === 0) {
        slots.push({
          venue_id: venueId,
          date,
          start_time: startTime,
          end_time: endTime
        });
      }
    }
    
    if (slots.length > 0) {
      return await this.createBulk(slots);
    }
    
    return [];
  }
}

module.exports = Slot; 