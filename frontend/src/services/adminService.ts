import api from './api';
import { 
  AdminDashboardData, 
  AdminStats, 
  User, 
  Venue, 
  Booking, 
  ApiResponse, 
  PaginatedResponse 
} from '../types';

export const adminService = {
  // Get admin dashboard data
  getDashboardData: async (): Promise<AdminDashboardData> => {
    const response = await api.get<ApiResponse<AdminDashboardData>>('/admin/dashboard');
    return response.data.data;
  },

  // Get admin statistics
  getStats: async (): Promise<AdminStats> => {
    const response = await api.get<ApiResponse<AdminStats>>('/admin/stats');
    return response.data.data;
  },

  // User Management
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<PaginatedResponse<User>> => {
    const response = await api.get<PaginatedResponse<User>>('/admin/users', { params });
    return response.data;
  },

  // Get user by ID
  getUser: async (userId: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/admin/users/${userId}`);
    return response.data.data;
  },

  // Update user
  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/admin/users/${userId}`, userData);
    return response.data.data;
  },

  // Delete user
  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`);
  },

  // Block/Unblock user
  toggleUserStatus: async (userId: string, action: 'block' | 'unblock'): Promise<User> => {
    const response = await api.patch<ApiResponse<User>>(`/admin/users/${userId}/${action}`);
    return response.data.data;
  },

  // Partner Management
  getPartners: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<PaginatedResponse<User>> => {
    const response = await api.get<PaginatedResponse<User>>('/admin/partners', { params });
    return response.data;
  },

  // Approve/Reject partner
  updatePartnerStatus: async (partnerId: string, status: 'approved' | 'rejected'): Promise<User> => {
    const response = await api.patch<ApiResponse<User>>(`/admin/partners/${partnerId}/status`, {
      status,
    });
    return response.data.data;
  },

  // Venue Management
  getVenues: async (params?: {
    page?: number;
    limit?: number;
    approved?: boolean;
    search?: string;
  }): Promise<PaginatedResponse<Venue>> => {
    const response = await api.get<PaginatedResponse<Venue>>('/admin/venues', { params });
    return response.data;
  },

  // Get pending venues for approval
  getPendingVenues: async (): Promise<Venue[]> => {
    const response = await api.get<ApiResponse<Venue[]>>('/admin/venues/pending');
    return response.data.data;
  },

  // Approve/Reject venue
  updateVenueStatus: async (venueId: string, status: 'approved' | 'rejected', reason?: string): Promise<Venue> => {
    const response = await api.patch<ApiResponse<Venue>>(`/admin/venues/${venueId}/status`, {
      status,
      reason,
    });
    return response.data.data;
  },

  // Delete venue
  deleteVenue: async (venueId: string): Promise<void> => {
    await api.delete(`/admin/venues/${venueId}`);
  },

  // Booking Management
  getBookings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedResponse<Booking>> => {
    const response = await api.get<PaginatedResponse<Booking>>('/admin/bookings', { params });
    return response.data;
  },

  // Get recent bookings
  getRecentBookings: async (limit: number = 10): Promise<Booking[]> => {
    const response = await api.get<ApiResponse<Booking[]>>(`/admin/bookings/recent?limit=${limit}`);
    return response.data.data;
  },

  // Analytics and Charts
  getRevenueChart: async (period: '7d' | '30d' | '90d' = '30d'): Promise<{
    labels: string[];
    data: number[];
  }> => {
    const response = await api.get<ApiResponse<{
      labels: string[];
      data: number[];
    }>>(`/admin/revenue-chart?period=${period}`);
    return response.data.data;
  },

  getUsersChart: async (period: '7d' | '30d' | '90d' = '30d'): Promise<{
    labels: string[];
    data: number[];
  }> => {
    const response = await api.get<ApiResponse<{
      labels: string[];
      data: number[];
    }>>(`/admin/users-chart?period=${period}`);
    return response.data.data;
  },

  // Platform Settings
  getSettings: async (): Promise<{
    platformFee: number;
    partnerCommission: number;
    maintenanceMode: boolean;
    supportEmail: string;
    supportPhone: string;
  }> => {
    const response = await api.get<ApiResponse<{
      platformFee: number;
      partnerCommission: number;
      maintenanceMode: boolean;
      supportEmail: string;
      supportPhone: string;
    }>>('/admin/settings');
    return response.data.data;
  },

  updateSettings: async (settings: {
    platformFee?: number;
    partnerCommission?: number;
    maintenanceMode?: boolean;
    supportEmail?: string;
    supportPhone?: string;
  }): Promise<void> => {
    await api.put('/admin/settings', settings);
  },

  // Reports
  generateReport: async (type: 'revenue' | 'bookings' | 'users', params: {
    startDate: string;
    endDate: string;
    format: 'pdf' | 'csv';
  }): Promise<Blob> => {
    const response = await api.get(`/admin/reports/${type}`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
}; 