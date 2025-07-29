import { PrismaClient } from "@prisma/client";
import { Wallet } from "../../models/membership.model";

const prisma = new PrismaClient();

export class WalletService {
  static async getWalletByUserId(userId: string): Promise<Wallet | null> {
    try {
      const wallet = await prisma.wallet.findUnique({
        where: { userId },
      });
      return wallet;
    } catch (error) {
      console.error("Error fetching wallet by user ID:", error);
      throw error;
    }
  }

  static async updateUserWallet(userId: string, credits: number) {
    try {
      // Create or update wallet
      const wallet = await prisma.wallet.upsert({
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
      return wallet;
    } catch (error) {
      console.error("Error updating user wallet:", error);
      throw error;
    }
  }
}
