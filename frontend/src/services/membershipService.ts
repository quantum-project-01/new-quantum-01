import api from "./api";

export interface MembershipPlan {
  id: string;
  name: string;
  description?: string;
  amount: number;
  credits: number;
  forRole: string;
  durationDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMembershipPayload {
  userId: string;
  planId: string;
}

export interface CreateOrderPayload {
  amount: number;
  userId: string;
  planId: string;
}

export interface RazorpayOrderResponse {
  success: boolean;
  data: {
    id: string;
    receipt: string;
  };
  membershipPlan: MembershipPlan;
}

export interface VerifyPaymentPayload {
  paymentId: string;
  signature: string;
  orderId: string;
  membershipId: string;
}

class MembershipService {
  // Get all available membership plans
  async getMembershipPlans(): Promise<{ success: boolean; data: MembershipPlan[] }> {
    try {
      const response = await api.get('/membership/plans');
      return response.data;
    } catch (error) {
      console.error('Error fetching membership plans:', error);
      throw error;
    }
  }

  // Step 1: Create membership record first
  async createMembership(payload: CreateMembershipPayload): Promise<{ success: boolean; id: string }> {
    try {
      const response = await api.post('/membership/create-membership', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating membership:', error);
      throw error;
    }
  }

  // Step 2: Create order for membership purchase
  async createMembershipOrder(membershipId: string, payload: CreateOrderPayload): Promise<RazorpayOrderResponse> {
    try {
      const response = await api.post(`/membership/create-order/${membershipId}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating membership order:', error);
      throw error;
    }
  }

  // Verify payment after successful Razorpay payment
  async verifyMembershipPayment(payload: VerifyPaymentPayload): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/membership/verify-payment', payload);
      return response.data;
    } catch (error) {
      console.error('Error verifying membership payment:', error);
      throw error;
    }
  }

  // Get user's memberships
  async getUserMemberships(): Promise<{ success: boolean; data: any[] }> {
    try {
      const response = await api.get('/membership/user-memberships');
      return response.data;
    } catch (error) {
      console.error('Error fetching user memberships:', error);
      throw error;
    }
  }
}

const membershipService = new MembershipService();
export default membershipService;