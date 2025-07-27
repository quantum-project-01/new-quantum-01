import { Request, Response } from "express";
import { Venue } from "../../models/venue.model";
import { AppError } from "../../types";
import { PartnerVenueMapService } from "../../services/venue-services/partnerVenueMap.service";
import { Prisma, PrismaClient } from "@prisma/client";
import { VenueService } from "../../services/venue-services/venue.service";

const prisma = new PrismaClient();

export class CreateVenueController {
  static async createVenue(req: Request, res: Response) {
    try {
      const {
        name,
        highlight,
        start_price_per_hour,
        partnerId,
        city,
        state,
        images,
        country,
        zip,
        phone,
        mapLocationLink,
        lat,
        lang
      } = req.body as {
        name: string;
        highlight: string;
        start_price_per_hour: number;
        partnerId: string;
        city: string;
        images: string[];
        state: string;
        country: string;
        zip: string;
        phone: string;
        mapLocationLink: string;
        lat: number;
        lang: number;
      };

      if (
        !name ||
        !highlight ||
        !start_price_per_hour ||
        !partnerId ||
        !city ||
        !state ||
        !country ||
        !zip ||
        !phone ||
        !mapLocationLink ||
        !lat ||
        !lang
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Compose the address field from city, state, country, and zip
      const address = `${city}, ${state}, ${country}, ${zip}`;

      const venueData: Venue = {
        name,
        location: {
          address,
          city,
          state,
          country,
          pincode: zip,
          coordinates:{
            lat,
            lang
          }
        },
        highlight,
        start_price_per_hour,
        partnerId,
        phone,
        mapLocationLink,
        details:{},
        cancellationPolicy:{},
        images:images,
        features:[],
        approved:false,
        rating:0,
        totalReviews:0,
        createdAt:new Date(),
        updatedAt:new Date()
      };

      const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // 1. Create the venue
        const createdVenue = await VenueService.createVenue(venueData, tx);
        
        // 2. Create the mapping using userId directly
        const mapping = await PartnerVenueMapService.createMapping(
          partnerId,
          createdVenue.id,
          tx
        );

        return { createdVenue, mapping };
      });

      if (!result) {
        return res
          .status(400)
          .json({ error: "Failed to create venue and mapping" });
      }

      return res.status(201).json({
        id: result.createdVenue.id,
        message: "Venue and mapping created successfully",
        mappingCreated: !!result.mapping,
      });
    } catch (error) {
      console.error("Error creating venue and mapping:", error);
      const appError = error as AppError;
      return res.status(500).json({
        message: "Failed to create venue and mapping",
        error: appError.message || "Unknown error",
      });
    }
  }
}
