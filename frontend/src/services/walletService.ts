import api from './api';

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
}

class WalletService {
  // Get wallet balance for a user
  async getWalletBalance(userId: string): Promise<{ success: boolean; balance: number }> {
    try {
      const response = await api.get(`/wallet/balance/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      throw error;
    }
  }

  // Get complete wallet info for a user
  async getUserWallet(userId: string): Promise<{ success: boolean; data: Wallet }> {
    try {
      const response = await api.get(`/wallet/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user wallet:', error);
      throw error;
    }
  }

  // Add credits to wallet (admin function)
  async addCredits(userId: string, credits: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/wallet/add-credits', {
        userId,
        credits
      });
      return response.data;
    } catch (error) {
      console.error('Error adding credits:', error);
      throw error;
    }
  }

  // Deduct credits from wallet
  async deductCredits(userId: string, credits: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/wallet/deduct-credits', {
        userId,
        credits
      });
      return response.data;
    } catch (error) {
      console.error('Error deducting credits:', error);
      throw error;
    }
  }
}

export default new WalletService(); 