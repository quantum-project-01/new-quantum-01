import { MembershipPlan } from "@prisma/client";
import { MembershipPlanService } from "../../services/membership-services/membershipPlan.service";
import { Request, Response } from "express";
import { MembershipRole } from "../../models/membership.model";

export class MembershipPlanController {
  static async getAllMembershipPlans(req: Request, res: Response) {
    try {
      const orderBy = req.query["orderBy"] as "asc" | "desc";

      const plans = await MembershipPlanService.getAllMembershipPlans(orderBy);

      return res.status(200).json(plans);
    } catch (error) {
      console.error("Error fetching membership plans:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getActiveMembershipPlans(_req: Request, res: Response) {
    try {
      const plans = await MembershipPlanService.getActiveMembershipPlans();

      return res.status(200).json({
        success: true,
        data: plans
      });
    } catch (error) {
      console.error("Error fetching active membership plans:", error);
      return res.status(500).json({ 
        success: false,
        error: "Internal server error" 
      });
    }
  }

  static async getMembershipPlanById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Plan ID is required" });
      }

      const plan = await MembershipPlanService.getMembershipPlanById(id);

      if (!plan) {
        return res.status(404).json({ message: "Membership plan not found" });
      }

      return res.status(200).json(plan);
    } catch (error) {
      console.error("Error fetching membership plan by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createMembershipPlan(req: Request, res: Response) {
    try {
      const planData = req.body as MembershipPlan;

      if (
        !planData.name ||
        !planData.amount ||
        !planData.forRole ||
        !planData.credits ||
        !planData.isActive
      ) {
        return res.status(400).json({ message: "Invalid plan data" });
      }

      if (planData.forRole !== "user" && planData.forRole !== "partner") {
        return res.status(400).json({ message: "Invalid membership role" });
      }

      const newPlan = await MembershipPlanService.createMembershipPlan({
        name: planData.name,
        description: planData.description ?? "",
        amount: planData.amount,
        durationDays: planData.durationDays,
        forRole: planData.forRole === MembershipRole.User ? MembershipRole.User : MembershipRole.Partner,
        credits: planData.credits,
        isActive: planData.isActive
      });

      return res.status(201).json(newPlan.id);
    } catch (error) {
      console.error("Error creating membership plan:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateMembershipPlan(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const planData = req.body as MembershipPlan;

      if (!id || !planData) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const existingPlan = await MembershipPlanService.getMembershipPlanById(id);

      if (!existingPlan) {
        return res.status(404).json({ message: "Membership plan not found" });
      }

      const updatedPlan = await MembershipPlanService.updateMembershipPlan(id, {
        name: planData.name ?? existingPlan.name,
        description: planData.description ?? existingPlan.description ?? "",
        amount: planData.amount ?? existingPlan.amount,
        durationDays: planData.durationDays ?? existingPlan.durationDays,
        forRole: planData.forRole === MembershipRole.User ? MembershipRole.User : MembershipRole.Partner,
        credits: planData.credits ?? existingPlan.credits,
        isActive: planData.isActive ?? existingPlan.isActive
      });

      if (!updatedPlan) {
        return res.status(404).json({ message: "Membership plan not found" });
      }

      return res.status(200).json(updatedPlan.id);
    } catch (error) {
      console.error("Error updating membership plan:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteMembershipPlan(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Plan ID is required" });
      }

      const deletedPlan = await MembershipPlanService.deleteMembershipPlan(id);

      if (!deletedPlan) {
        return res.status(404).json({ message: "Membership plan not found" });
      }

      return res.status(200).json({ message: "Membership plan deleted successfully" });
    } catch (error) {
      console.error("Error deleting membership plan:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
