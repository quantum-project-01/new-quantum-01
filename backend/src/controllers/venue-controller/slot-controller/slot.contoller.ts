import { Request, Response } from "express";
import { Slot } from "../../../models/venue.model";
import { SlotService } from "../../../services/slot.service";

export class SlotController {
  static async createSlot(req: Request, res: Response) {
    try {
      const { date, amount, availability, startTime, endTime, facilityId } =
        req.body;

      if (
        !date ||
        !amount ||
        !availability ||
        !startTime ||
        !endTime ||
        !facilityId
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newSlot: Slot = {
        date,
        amount,
        availability,
        startTime,
        endTime,
        facilityId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const slot = await SlotService.createSlot(newSlot);

      return res.status(201).json({ data: slot.id });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create slot" });
    }
  }

  static async createSlots(req: Request, res: Response) {
    try {
      const { facilityId } = req.params;
      const { date, startTime, endTime, amount, availability } = req.body;
      if (
        !facilityId ||
        !date ||
        !startTime ||
        !endTime ||
        !amount ||
        !availability
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const createdSlots = await SlotService.createMultipleSlots(
        date,
        startTime,
        endTime,
        facilityId,
        amount,
        availability
      );
      return res.status(201).json({ data: createdSlots.count });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create slots for day" });
    }
  }

  static async getSlotsByFacilityId(req: Request, res: Response) {
    try {
      const { facilityId } = req.params;
      if (!facilityId) {
        return res.status(400).json({ message: "Facility ID is required" });
      }

      const slots = await SlotService.getSlotsByFacilityId(facilityId);
      return res.status(200).json({ data: slots });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get slots" });
    }
  }

  static async getSlotsByDateRangeAndFacilityId(req: Request, res: Response) {
    try {
      const { facilityId } = req.params;

      if (!facilityId) {
        return res.status(400).json({ message: "Facility ID is required" });
      }

      const { startDate, endDate, sortType = "asc" } = req.body;

      if (!startDate || !endDate || !facilityId) {
        return res.status(400).json({
          message: "Start date, end date and facility ID are required",
        });
      }

      const slots = await SlotService.getSlotsByDateRangeAndFacilityId(
        startDate,
        endDate,
        facilityId,
        sortType
      );
      return res.status(200).json({ data: slots });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get slots" });
    }
  }

  static async updateSlot(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Slot ID is required" });
      }

      const existingSlot = await SlotService.getSlotById(id);

      if (!existingSlot) {
        return res.status(404).json({ message: "Slot not found" });
      }

      const newSlot: Slot = {
        date: req.body.date || existingSlot.date,
        amount: req.body.amount || existingSlot.amount,
        availability: req.body.availability || existingSlot.availability,
        startTime: req.body.startTime || existingSlot.startTime,
        endTime: req.body.endTime || existingSlot.endTime,
      };

      const updatedSlot = await SlotService.updateSlot(id, newSlot);
      return res.status(200).json({ data: updatedSlot.id });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update slot" });
    }
  }

  

  static async deleteSlot(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Slot ID is required" });
      }

      const deletedSlot = await SlotService.deleteSlot(id);
      return res.status(200).json({ data: deletedSlot.id });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete slot" });
    }
  }

  static async updateSlots(req: Request, res: Response) {
    try {
      const { facilityId } = req.params;
      if (!facilityId) {
        return res.status(400).json({ message: "Facility ID is required" });
      }

      const { ids, date, amount, availability, startTime, endTime } = req.body;

      if (!date || !amount || !availability || !startTime || !endTime) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const slots = await SlotService.getSlotsByFacilityId(facilityId);

      const newSlots: Slot[] = slots.map((slot, index) => {
        return {
          id: ids[index],
          date: date || slot.date,
          amount: amount || slot.amount,
          availability: availability || slot.availability,
          startTime: startTime || slot.startTime,
          endTime: endTime || slot.endTime,
        };
      });

      await SlotService.updateSlots(newSlots);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update slots" });
    }
  }
}
