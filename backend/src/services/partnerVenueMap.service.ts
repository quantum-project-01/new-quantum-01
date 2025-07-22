import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PartnerVenueMapService {
  static async createMapping(
    partnerDetailId: string,
    venueId: string,
    tx: Prisma.TransactionClient
  ) {
    try {
      const mapping = await tx.partnerVenueMap.create({
        data: {
          partnerDetailId,
          venueId,
        },
      });
      return mapping;
    } catch (error) {
      console.error("Error creating partner-venue mapping:", error);
      throw error;
    }
  }

  static async getVenuesByPartner(
    partnerDetailId: string,
    page: number,
    limit: number
  ) {
    try {
      const mappings = await prisma.partnerVenueMap.findMany({
        where: { partnerDetailId },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          venue: true,
        },
      });

      return mappings.map((mapping) => mapping.venue);
    } catch (error) {
      console.error("Error getting venues by partner:", error);
      throw error;
    }
  }

  static async getPartnersByVenue(venueId: string) {
    try {
      const mappings = await prisma.partnerVenueMap.findMany({
        where: { venueId },
        include: {
          partnerDetails: true,
        },
      });
      return mappings.map((mapping) => mapping.partnerDetails);
    } catch (error) {
      console.error("Error getting partners by venue:", error);
      throw error;
    }
  }

  static async deleteMapping(venueId: string, tx:Prisma.TransactionClient) {
    try {
      const mapping = await tx.partnerVenueMap.deleteMany({
        where: { venueId },
      });
      return mapping;
    } catch (error) {
      console.error("Error deleting partner-venue mapping:", error);
      throw error;
    }
  }
}
