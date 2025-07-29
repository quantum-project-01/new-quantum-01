import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SeedDataService {
  static async seedMembershipPlans() {
    try {
      // Check if membership plans already exist
      const existingPlans = await prisma.membershipPlan.findMany();
      
      if (existingPlans.length > 0) {
        console.log('Membership plans already exist, skipping seed...');
        return existingPlans;
      }

      console.log('Seeding membership plans...');

      const membershipPlans = [
        {
          name: 'Basic Pro',
          description: 'Get started with premium sports booking experience',
          amount: 5000, // ₹50.00 (stored in paise)
          credits: 6000, // ₹60.00 worth of credits (stored in paise)
          forRole: 'user' as any,
          durationDays: 365, // 1 year
          isActive: true,
        },
        {
          name: 'Premium Elite',
          description: 'Ultimate sports booking experience with exclusive perks',
          amount: 10000, // ₹100.00 (stored in paise)
          credits: 12000, // ₹120.00 worth of credits (stored in paise)
          forRole: 'user' as any,
          durationDays: 365, // 1 year
          isActive: true,
        }
      ];

      const createdPlans = await Promise.all(
        membershipPlans.map(plan => 
          prisma.membershipPlan.create({ data: plan })
        )
      );

      console.log(`✅ Created ${createdPlans.length} membership plans`);
      return createdPlans;
    } catch (error) {
      console.error('Error seeding membership plans:', error);
      throw error;
    }
  }

  static async seedAllData() {
    try {
      console.log('🌱 Starting data seeding...');
      
      await this.seedMembershipPlans();
      
      console.log('✅ Data seeding completed successfully!');
    } catch (error) {
      console.error('❌ Error during data seeding:', error);
      throw error;
    }
  }
} 