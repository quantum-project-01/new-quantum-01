import { Slot, SlotAvailability } from "../models/venue.model";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SlotService {
  static async createSlot(slot: Slot) {
    try {
      const newSlot = await prisma.slot.create({
        data: slot,
      });
      return newSlot;
    } catch (error) {
      console.error("Error creating slot:", error);
      throw error;
    }
  }

  static async createMultipleSlots(
    startDate: Date,
    endDate: Date, 
    startTime: string, // "09:00"
    endTime: string,   // "17:00"
    facilityId: string,
    amount: number,
    availability: SlotAvailability = "available"
  ) {
    try {
      const result = await prisma.$executeRaw`
        INSERT INTO slots (id, date, "startTime", "endTime", "facilityId", amount, availability, "createdAt", "updatedAt")
        SELECT 
          gen_random_uuid() as id,
          date_series::date as date,
          time_series::time as "startTime",
          (time_series + interval '30 minutes')::time as "endTime",
          ${facilityId}::text as "facilityId",
          ${amount}::decimal as amount,
          ${availability}::"SlotAvailability" as availability,
          NOW() as "createdAt",
          NOW() as "updatedAt"
        FROM 
          generate_series(${startDate}::date, ${endDate}::date, interval '1 day') as date_series,
          generate_series(
            ('2024-01-01 ' || ${startTime} || ':00')::timestamp,
            ('2024-01-01 ' || ${endTime} || ':00')::timestamp - interval '30 minutes',
            interval '30 minutes'
          ) as time_series
      `;

      return { count: Number(result) };
    } catch (error) {
      console.error("Error creating multiple slots:", error);
      throw error;
    }
  }

  static async getSlotsByFacilityId(facilityId: string) { 
    try {
      const slots = await prisma.slot.findMany({
        where: { facilityId },
      });
      return slots;
    } catch (error) {
      console.error("Error getting slots by facilityId:", error);
      throw error;
    }
  }

  static async getSlotsByDateRangeAndFacilityId(
    startDate: string, 
    endDate: string, 
    facilityId: string,
    sortType: "asc" | "desc"
  ) {
    try {
      const slots = await prisma.slot.findMany({
        where: {
          facilityId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          date: sortType,
        },
      });
      return slots;
    } catch (error) {
      console.error("Error getting slots by date range and facilityId:", error);
      throw error;
    }
  }

  static async updateSlot(id: string, slot: Slot) {
    try {
      const updatedSlot = await prisma.slot.update({
        where: { id },
        data: slot,
      });
      return updatedSlot;
    } catch (error) {
      console.error("Error updating slot:", error);
      throw error;
    }
  }

  static async deleteSlot(id: string) {
    try {
      const deletedSlot = await prisma.slot.delete({
        where: { id },
      });
      return deletedSlot;
    } catch (error) {
      console.error("Error deleting slot:", error);
      throw error;
    }
  }

  static async getSlotById(id: string) {
    try {
      const slot = await prisma.slot.findUnique({
        where: { id },
      });
      return slot;
    } catch (error) {
      console.error("Error getting slot by id:", error);
      throw error;
    }
  }

  static async updateSlots(slots: Slot[]) {
    try {
      const updatedSlots = await prisma.slot.updateMany({
        data: slots,
      });
      return updatedSlots;
    } catch (error) {
      console.error("Error updating slots:", error);
      throw error;
    }
  }
}