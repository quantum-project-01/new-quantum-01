import api from './api';
import { 
  PartnerDashboardData, 
  PartnerStats, 
  Booking, 
  Venue, 
  ApiResponse, 
  PaginatedResponse 
} from '../types';

export const partnerService = {
  // Get partner dashboard data
  getDashboardData: async (): Promise<PartnerDashboardData> => {
    const response = await api.get<ApiResponse<PartnerDashboardData>>('/partner/dashboard');
    return response.data.data;
  },

  // Get partner statistics
  getStats: async (): Promise<PartnerStats> => {
    const response = await api.get<ApiResponse<PartnerStats>>('/partner/stats');
    return response.data.data;
  },

  // Get partner bookings
  getBookings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedResponse<Booking>> => {
    const response = await api.get<PaginatedResponse<Booking>>('/partner/bookings', { params });
    return response.data;
  },

  // Get partner venues
  getVenues: async (): Promise<Venue[]> => {
    const response = await api.get<ApiResponse<Venue[]>>('/partner/venues');
    return response.data.data;
  },

  // Add new venue
  addVenue: async (venueData: FormData): Promise<Venue> => {
    const response = await api.post<ApiResponse<Venue>>('/partner/venues', venueData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Update venue
  updateVenue: async (venueId: string, venueData: FormData): Promise<Venue> => {
    const response = await api.put<ApiResponse<Venue>>(`/partner/venues/${venueId}`, venueData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Delete venue
  deleteVenue: async (venueId: string): Promise<void> => {
    await api.delete(`/partner/venues/${venueId}`);
  },

  // Get earnings chart data
  getEarningsChart: async (period: '7d' | '30d' | '90d' = '30d'): Promise<{
    labels: string[];
    data: number[];
  }> => {
    const response = await api.get<ApiResponse<{
      labels: string[];
      data: number[];
    }>>(`/partner/earnings-chart?period=${period}`);
    return response.data.data;
  },

  // Get bookings chart data
  getBookingsChart: async (period: '7d' | '30d' | '90d' = '30d'): Promise<{
    labels: string[];
    data: number[];
  }> => {
    const response = await api.get<ApiResponse<{
      labels: string[];
      data: number[];
    }>>(`/partner/bookings-chart?period=${period}`);
    return response.data.data;
  },

  // Update booking status
  updateBookingStatus: async (bookingId: string, status: 'confirmed' | 'cancelled'): Promise<Booking> => {
    const response = await api.patch<ApiResponse<Booking>>(`/partner/bookings/${bookingId}/status`, {
      status,
    });
    return response.data.data;
  },

  // Get venue analytics
  getVenueAnalytics: async (venueId: string): Promise<{
    totalBookings: number;
    totalEarnings: number;
    averageRating: number;
    occupancyRate: number;
    monthlyData: {
      month: string;
      bookings: number;
      earnings: number;
    }[];
  }> => {
    const response = await api.get<ApiResponse<{
      totalBookings: number;
      totalEarnings: number;
      averageRating: number;
      occupancyRate: number;
      monthlyData: {
        month: string;
        bookings: number;
        earnings: number;
      }[];
    }>>(`/partner/venues/${venueId}/analytics`);
    return response.data.data;
  },
}; 