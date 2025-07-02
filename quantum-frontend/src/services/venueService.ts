import api from './api';
import { Venue, VenueForm, VenueFilters, TimeSlot, ApiResponse, PaginatedResponse } from '../types';

export const venueService = {
  // Get all venues with filters and pagination
  getVenues: async (
    filters?: VenueFilters,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<Venue>> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    if (filters) {
      if (filters.sportType) params.append('sportType', filters.sportType);
      if (filters.city) params.append('city', filters.city);
      if (filters.date) params.append('date', filters.date);
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString());
        params.append('maxPrice', filters.priceRange.max.toString());
      }
      if (filters.amenities) {
        filters.amenities.forEach(amenity => params.append('amenities[]', amenity));
      }
    }
    
    const response = await api.get(`/venues?${params}`);
    return response.data;
  },

  // Get single venue by ID
  getVenue: async (id: string): Promise<ApiResponse<Venue>> => {
    const response = await api.get(`/venues/${id}`);
    return response.data;
  },

  // Create new venue (Partner only)
  createVenue: async (venueData: VenueForm): Promise<ApiResponse<Venue>> => {
    const formData = new FormData();
    
    // Append text fields
    Object.entries(venueData).forEach(([key, value]) => {
      if (key !== 'images' && key !== 'sportType' && key !== 'amenities') {
        formData.append(key, value.toString());
      }
    });

    // Append arrays
    venueData.sportType.forEach(sport => formData.append('sportType[]', sport));
    venueData.amenities.forEach(amenity => formData.append('amenities[]', amenity));

    // Append images
    venueData.images.forEach(image => formData.append('images', image));

    const response = await api.post('/venues', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update venue (Partner only)
  updateVenue: async (id: string, venueData: Partial<VenueForm>): Promise<ApiResponse<Venue>> => {
    const response = await api.put(`/venues/${id}`, venueData);
    return response.data;
  },

  // Delete venue (Partner only)
  deleteVenue: async (id: string): Promise<ApiResponse<string>> => {
    const response = await api.delete(`/venues/${id}`);
    return response.data;
  },

  // Get venue slots for a specific date
  getVenueSlots: async (venueId: string, date: string): Promise<ApiResponse<TimeSlot[]>> => {
    const response = await api.get(`/venues/${venueId}/slots?date=${date}`);
    return response.data;
  },

  // Get partner's venues
  getPartnerVenues: async (): Promise<ApiResponse<Venue[]>> => {
    const response = await api.get('/venues/partner/my-venues');
    return response.data;
  },

  // Search venues
  searchVenues: async (query: string, filters?: VenueFilters): Promise<ApiResponse<Venue[]>> => {
    const params = new URLSearchParams();
    params.append('q', query);
    
    if (filters) {
      if (filters.sportType) params.append('sportType', filters.sportType);
      if (filters.city) params.append('city', filters.city);
      if (filters.date) params.append('date', filters.date);
      if (filters.priceRange) {
        params.append('minPrice', filters.priceRange.min.toString());
        params.append('maxPrice', filters.priceRange.max.toString());
      }
      if (filters.amenities) {
        filters.amenities.forEach(amenity => params.append('amenities[]', amenity));
      }
    }
    
    const response = await api.get(`/venues/search?${params}`);
    return response.data;
  },

  // Get popular venues
  getPopularVenues: async (limit = 10): Promise<ApiResponse<Venue[]>> => {
    const response = await api.get(`/venues/popular?limit=${limit}`);
    return response.data;
  },

  // Get nearby venues
  getNearbyVenues: async (lat: number, lng: number, radius = 10): Promise<ApiResponse<Venue[]>> => {
    const response = await api.get(`/venues/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    return response.data;
  },
}; 