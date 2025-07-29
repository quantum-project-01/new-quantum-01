import { Request, Response } from "express";
import { Currency, Order, PaymentMethod } from "../../models/payment.model";
import { PaymentService } from "../../services/booking-services/payment.service";
import { MembershipService } from "../../services/membership-services/membership.service";
import { SeedDataService } from "../../services/membership-services/seedData.service";
import { AppError } from "../../types";

export class MembershipController {
  
  static async createMembershipOrder(req: Request, res: Response) {
    try {
      const { amount, payment_type, type_id } = req.body;
      const userId = (req as any).user?.userId; // Assuming auth middleware sets this

      if (!amount || !payment_type || !type_id) {
        return res.status(400).json({ 
          message: "Missing required fields: amount, payment_type, type_id" 
        });
      }

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Validate membership plan exists
      const membershipPlan = await MembershipService.getMembershipPlanById(type_id);
      if (!membershipPlan) {
        return res.status(404).json({ message: "Membership plan not found" });
      }

      // Create Razorpay order
      const order = await PaymentService.createMembershipPaymentRazorpay({
        amount: Number(amount),
        membershipId: type_id,
        customerId: userId,
        currency: Currency.INR,
      });

      const orderData: Order = {
        id: order.id,
        receipt: order.receipt as string,
      };

      if (!orderData) {
        throw new Error("Failed to create Razorpay order");
      }

      // Create transaction record (don't set membershipId yet - will be set after payment success)
      const transaction = await PaymentService.createTransaction({
        orderId: order.id,
        amount: Number(amount),
        currency: Currency.INR,
        paymentMethod: PaymentMethod.Razorpay,
      });

      if (!transaction) {
        console.log("Transaction creation failed for membership order");
      }

      return res.status(200).json({ 
        success: true,
        data: orderData,
        membershipPlan 
      });
    } catch (error: any) {
      console.error("Error creating membership order:", error);
      return res.status(500).json({
        message: "Failed to create membership order",
        error: error.message,
      });
    }
  }

  static async verifyMembershipPayment(req: Request, res: Response) {
    try {
      const { paymentId, signature, orderId, membershipId } = req.body as {
        paymentId: string;
        signature: string;
        orderId: string;
        membershipId: string;
      };
      const userId = (req as any).user?.userId;

      if (!paymentId || !signature || !orderId || !membershipId) {
        return res.status(400).json({ message: "Payment details are missing" });
      }

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Verify payment signature
      const verified = await PaymentService.verifyPaymentSignature({
        paymentId,
        signature,
        orderId,
      });

      if (!verified) {
        await PaymentService.handleMembershipPayment({
          success: false,
          membershipId,
          userId,
          orderId,
          paymentId,
        });
        throw new Error("Payment verification failed");
      }

      // Handle successful payment
      await PaymentService.handleMembershipPayment({
        success: true,
        membershipId,
        userId,
        orderId,
        paymentId,
      });

      return res.status(200).json({ 
        success: true,
        message: "Payment verified and membership activated successfully" 
      });
    } catch (error) {
      console.error("Error verifying membership payment:", error);
      const appError = error as AppError;
      return res.status(500).json({
        message: "Failed to verify membership payment",
        error: appError.message || "Unknown error",
      });
    }
  }

  static async getMembershipPlans(_req: Request, res: Response) {
    try {
      const plans = await MembershipService.getAllMembershipPlans();
      return res.status(200).json({ 
        success: true,
        data: plans 
      });
    } catch (error: any) {
      console.error("Error fetching membership plans:", error);
      return res.status(500).json({
        message: "Failed to fetch membership plans",
        error: error.message,
      });
    }
  }

  static async getUserMemberships(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.userId;
      
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const memberships = await MembershipService.getUserMemberships(userId);
      return res.status(200).json({ 
        success: true,
        data: memberships 
      });
    } catch (error: any) {
      console.error("Error fetching user memberships:", error);
      return res.status(500).json({
        message: "Failed to fetch user memberships",
        error: error.message,
      });
    }
  }

  // Development only - seed membership plans
  static async seedMembershipPlans(_req: Request, res: Response) {
    try {
      if (process.env['NODE_ENV'] === 'production') {
        return res.status(403).json({ 
          message: "Seeding not allowed in production" 
        });
      }

      const plans = await SeedDataService.seedMembershipPlans();
      return res.status(200).json({ 
        success: true,
        message: "Membership plans seeded successfully",
        data: plans 
      });
    } catch (error: any) {
      console.error("Error seeding membership plans:", error);
      return res.status(500).json({
        message: "Failed to seed membership plans",
        error: error.message,
      });
    }
  }
}