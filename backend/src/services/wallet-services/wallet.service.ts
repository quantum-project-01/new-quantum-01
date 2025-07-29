import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class WalletService {
  static async getWalletBalance(userId: string): Promise<number> {
    try {
      const wallet = await prisma.wallet.findUnique({
        where: { userId }
      });
      
      return wallet ? wallet.balance : 0;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      return 0;
    }
  }

  static async addCredits(userId: string, credits: number): Promise<boolean> {
    try {
      // First verify the user exists
      const userExists = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!userExists) {
        console.error(`User ${userId} not found in database`);
        return false;
      }

      await prisma.wallet.upsert({
        where: { userId },
        update: {
          balance: {
            increment: credits,
          },
        },
        create: {
          userId,
          balance: credits,
        },
      });

      console.log(`✅ Added ${credits} credits to user ${userId} wallet`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to add credits to wallet for user ${userId}:`, error);
      return false;
    }
  }

  static async deductCredits(userId: string, credits: number): Promise<boolean> {
    try {
      const wallet = await prisma.wallet.findUnique({
        where: { userId }
      });

      if (!wallet || wallet.balance < credits) {
        console.error(`Insufficient balance for user ${userId}`);
        return false;
      }

      await prisma.wallet.update({
        where: { userId },
        data: {
          balance: {
            decrement: credits,
          },
        },
      });

      console.log(`✅ Deducted ${credits} credits from user ${userId} wallet`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to deduct credits from wallet for user ${userId}:`, error);
      return false;
    }
  }

  static async getUserWallet(userId: string) {
    try {
      const wallet = await prisma.wallet.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });

      return wallet;
    } catch (error) {
      console.error("Error fetching user wallet:", error);
      throw error;
    }
  }
} 