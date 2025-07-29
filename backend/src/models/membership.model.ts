export interface MembershipPlan {
  id: string;
  name: string;
  description?: string;
  amount: number;
  credits: number;
  forRole: MembershipRole;
  durationDays: number; 
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum MembershipRole {
  user = "user",
  partner = "partner"
}

export interface Membership {
  id: string;
  userId: string;
  planId: string;
  transactionOrderId?: string;
  startDate: Date;
  endDate: Date;
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
