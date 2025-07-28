export interface MembershipPlan {
  id: string;
  name: string;
  description?: string;
  amount: number;
  credits: number;
  forRole: MembershipRole;
  durationDays?: number; 
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum MembershipRole {
    Customer = "customer",
    Partner = "partner"
}

export interface Membership {
  id: string;
  userId: string;
  membershipPlanId: string;
  creditsGiven: number;
  startedAt: Date;
  expiredAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number; 
  createdAt: Date;
  updatedAt: Date;
}
