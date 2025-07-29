import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MembershipService {
  
  static async getAllMembershipPlans() {
    try {
      const plans = await prisma.membershipPlan.findMany({
        where: { isActive: true },
        orderBy: { amount: 'asc' }
      });
      return plans;
    } catch (error) {
      console.error("Error fetching membership plans:", error);
      throw error;
    }
  }

  static async getMembershipPlanById(id: string) {
    try {
      const plan = await prisma.membershipPlan.findUnique({
        where: { id },
      });
      return plan;
    } catch (error) {
      console.error("Error fetching membership plan by id:", error);
      throw error;
    }
  }

  static async createMembership(data: {
    userId: string;
    planId: string;
    transactionOrderId: string;
    startDate: Date;
    endDate: Date;
  }) {
    try {
      const membership = await prisma.membership.create({
        data: data as any, // Temporary fix for Prisma type mismatch
        include: {
          plan: true,
        },
      });
      return membership;
    } catch (error) {
      console.error("Error creating membership:", error);
      throw error;
    }
  }

  static async getUserMemberships(userId: string) {
    try {
      const memberships = await prisma.membership.findMany({
        where: { userId },
        include: { plan: true },
        orderBy: { createdAt: 'desc' }
      });
      return memberships;
    } catch (error) {
      console.error("Error fetching user memberships:", error);
      throw error;
    }
  }

  static async getActiveMembership(userId: string) {
    try {
      const now = new Date();
      const membership = await prisma.membership.findFirst({
        where: {
          userId,
          startDate: { lte: now },
          endDate: { gte: now },
        },
        include: { plan: true },
      });
      return membership;
    } catch (error) {
      console.error("Error fetching active membership:", error);
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