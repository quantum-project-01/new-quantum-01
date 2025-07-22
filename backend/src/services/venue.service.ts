import { Venue } from "../models/venue.model";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class VenueService {
  static async createVenue(venue: Venue,tx:Prisma.TransactionClient) {
    try {
      const newVenue = await tx.venue.create({
        data: { 
          name: venue.name,
          location: venue.location as unknown as Prisma.InputJsonValue,
          highlight: venue.highlight || null,
          start_price_per_hour: venue.start_price_per_hour,
          partnerId: venue.partnerId,
          phone: venue.phone,
          mapLocationLink: venue.mapLocationLink,
          cancellationPolicy: venue.cancellationPolicy || {},
          images: venue.images || [],
          features: venue.features || [],
          approved: venue.approved || false,
          rating: venue.rating || null,
          totalReviews: venue.totalReviews || 0,
        },
      });
      return newVenue;
    } catch (error) {
      console.error("Error creating venue:", error);
      throw error;
    }
  }

  static async getVenue(id: string) {
    try {
      const venue = await prisma.venue.findUnique({
        where: { id },
      });
      return venue;
    } catch (error) {
      console.error("Error getting venue:", error);
      throw error;
    }
  }

  static async updateVenue(id: string, venue: Venue) {
    try {
      const updatedVenue = await prisma.venue.update({
        where: { id },
        data: {
          name: venue.name,
          location: venue.location as unknown as Prisma.InputJsonValue,
          highlight: venue.highlight || null,
          start_price_per_hour: venue.start_price_per_hour,
          partnerId: venue.partnerId,
          phone: venue.phone,
          mapLocationLink: venue.mapLocationLink,
          cancellationPolicy: venue.cancellationPolicy || {},
          images: venue.images || [],
          features: venue.features || [],
          approved: venue.approved || false,
          rating: venue.rating || null,
          totalReviews: venue.totalReviews || 0,
          createdAt: venue.createdAt,
          updatedAt: new Date(),
        },
      });
      return updatedVenue;
    } catch (error) {
      console.error("Error updating venue:", error);
      throw error;
    }
  }

  static async deleteVenue(id: string,tx:Prisma.TransactionClient) {
    try {
      const deletedVenue = await tx.venue.delete({
        where: { id },
      });
      return deletedVenue;
    } catch (error) {
      console.error("Error deleting venue:", error);
      throw error;
    }
  }
}
