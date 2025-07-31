import axiosInstance from "../api";

export interface Slot {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  amount: number;
  availability: 'available' | 'not_available' | 'booked' | 'filling_fast';
  facilityId: string;
  facilityName?: string;
  activityName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SlotFormData {
  date: string;
  startTime: string;
  endTime: string;
  amount: number;
  availability: 'available' | 'not_available' | 'booked' | 'filling_fast';
  facilityId: string;
}

export interface BulkSlotFormData {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  amount: number;
  availability: 'available' | 'not_available' | 'booked' | 'filling_fast';
  facilityId: string;
}

export const createSlot = async (slot: SlotFormData) => {
  try {
    console.log('Creating SINGLE slot with data:', slot);
    console.log('API endpoint:', '/venue/slot/create-slot');
    
    const response = await axiosInstance.post("/venue/slot/create-slot", slot);
    
    console.log('Single slot creation response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating slot:", error);
    throw error;
  }
};

export const createMultipleSlots = async (facilityId: string, bulkData: BulkSlotFormData) => {
  try {
    // Validate input data
    if (!facilityId) {
      throw new Error('Facility ID is required');
    }
    
    if (!bulkData.startDate || !bulkData.endDate || !bulkData.startTime || !bulkData.endTime) {
      throw new Error('All date and time fields are required for bulk creation');
    }

    // The backend expects the data in the request body, not as a separate parameter
    const payload = {
      startDate: bulkData.startDate,
      endDate: bulkData.endDate,
      startTime: bulkData.startTime,
      endTime: bulkData.endTime,
      amount: bulkData.amount,
      availability: bulkData.availability
    };
    
    console.log('Creating bulk slots with payload:', payload);
    console.log('Facility ID:', facilityId);
    console.log('API endpoint:', `/venue/slot/create-multiple-slots/${facilityId}`);
    
    const response = await axiosInstance.post(`/venue/slot/create-multiple-slots/${facilityId}`, payload);
    
    console.log('Bulk creation response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating multiple slots:", error);
    console.error("Error response:", error?.response?.data);
    console.error("Error status:", error?.response?.status);
    
    // Re-throw with more specific error message
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error?.message) {
      throw error;
    } else {
      throw new Error('Failed to create bulk slots');
    }
  }
};

export const getSlotsByFacility = async (facilityId: string) => {
  try {
  const response = await axiosInstance.get(`/venue/slot/get-slots-by-facility/${facilityId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting slots by facility:", error);
    throw error;
  }
};

export const getSlotsByDateRangeAndFacility = async (facilityId: string, startDate: string, endDate: string) => {
  try {
    const response = await axiosInstance.get(`/venue/slot/get-slots-by-date-range-and-facility/${facilityId}`, {
      params: { startDate, endDate }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error getting slots by date range and facility:", error);
    throw error;
  }
};

export const updateSlot = async (id: string, slot: Partial<SlotFormData>) => {
  try {
    const response = await axiosInstance.put(`/venue/slot/update-slot/${id}`, slot);
    return response.data;
  } catch (error) {
    console.error("Error updating slot:", error);
    throw error;
  }
};

export const deleteSlot = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/venue/slot/delete-slot/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting slot:", error);
    throw error;
  }
};

export const checkSlotAvailability = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/venue/slot/check-slot-availability/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error checking slot availability:", error);
    throw error;
  }
};

export const getAvailableSlotsByFacilityAndDate = async (facilityId: string, date: string) => {
  try {
    const response = await axiosInstance.get(`/venue/slot/get-available-slots-by-facility-and-date/${facilityId}`, {
      params: { date }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error getting available slots by facility and date:", error);
    throw error;
  }
};

// Helper function to get all slots for a venue by getting all facilities first  
export const getSlotsByVenue = async (venueId: string, startDate?: string, endDate?: string) => {
  try {
    // First get all activities for the venue
    const activitiesResponse = await axiosInstance.get(`/venue/activity-facility/get-activities-by-venue/${venueId}`);
    const activities = activitiesResponse.data.data;
    
    // Then get all facilities for each activity
    const allSlots: Slot[] = [];
    for (const activity of activities) {
      try {
        const facilitiesResponse = await axiosInstance.get(`/venue/activity-facility/get-facilities-by-activity/${activity.id}`);
        const facilities = facilitiesResponse.data.data;
        
        // Get slots for each facility
        for (const facility of facilities) {
          try {
            let slotsResponse;
            if (startDate && endDate) {
              slotsResponse = await axiosInstance.get(`/venue/slot/get-slots-by-date-range-and-facility/${facility.id}`, {
                params: { startDate, endDate }
              });
            } else {
              slotsResponse = await axiosInstance.get(`/venue/slot/get-slots-by-facility/${facility.id}`);
            }
            
            const slots = slotsResponse.data.data.map((slot: Slot) => ({
              ...slot,
              facilityName: facility.name,
              activityName: activity.name
            }));
            allSlots.push(...slots);
          } catch (error) {
            console.warn(`Error getting slots for facility ${facility.id}:`, error);
          }
        }
      } catch (error) {
        console.warn(`Error getting facilities for activity ${activity.id}:`, error);
      }
    }
    
    return allSlots;
  } catch (error) {
    console.error("Error getting slots by venue:", error);
    throw error;
  }
};

// Helper function to generate time slots for bulk creation
export const generateBulkSlots = (bulkData: BulkSlotFormData): SlotFormData[] => {
  const slots: SlotFormData[] = [];
  const startDate = new Date(bulkData.startDate);
  const endDate = new Date(bulkData.endDate);
  
  // Generate slots for each day in the range
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    
    // Parse start and end times
    const [startHour, startMinute] = bulkData.startTime.split(':').map(Number);
    const [endHour, endMinute] = bulkData.endTime.split(':').map(Number);
    
    // Generate 30-minute slots
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const startTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      
      // Calculate end time (30 minutes later)
      let slotEndMinute = currentMinute + 30;
      let slotEndHour = currentHour;
      
      if (slotEndMinute >= 60) {
        slotEndMinute -= 60;
        slotEndHour += 1;
      }
      
      const endTime = `${slotEndHour.toString().padStart(2, '0')}:${slotEndMinute.toString().padStart(2, '0')}`;
      
      // Don't create slot if it would end after the specified end time
      if (slotEndHour > endHour || (slotEndHour === endHour && slotEndMinute > endMinute)) {
        break;
      }
      
      slots.push({
        date: dateStr,
        startTime,
        endTime,
        amount: bulkData.amount,
        availability: bulkData.availability,
        facilityId: bulkData.facilityId,
      });
      
      // Move to next 30-minute slot
      currentMinute += 30;
      if (currentMinute >= 60) {
        currentMinute -= 60;
        currentHour += 1;
      }
    }
  }
  
  return slots;
}; 