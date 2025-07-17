import { Request, Response } from "express";
import { VenueService } from "../services/venue.service";
import { Venue } from "../models/venue.model";
import { AppError } from "../types";

export class CreateVenueController {
  static async createVenue(req: Request, res: Response) {
    try {
      const {
        name,
        highlight,
        main,
        start_price_per_hour,
        partnerId,
        city,
        state,
        country,
        zip,
        phone,
        mapLocationLink,
      } = req.body as {
        name: string;
        highlight: string;
        main: string;
        start_price_per_hour: number;
        partnerId: string;
        city: string;
        state: string;
        country: string;
        zip: string;
        phone: string;
        mapLocationLink: string;
      };

      if (
        !name ||
        !highlight ||
        !main ||
        !start_price_per_hour ||
        !partnerId ||
        !city ||
        !state ||
        !country ||
        !zip ||
        !phone ||
        !mapLocationLink
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Compose the address field from city, state, country, and zip
      const location = `${city}, ${state}, ${country}, ${zip}`;

      const venueData: Venue = {
        name,
        location,
        highlight,
        main,
        start_price_per_hour,
        partnerId,
        city,
        state,
        country,
        zip,
        phone,
        mapLocationLink,
      };

      const data  = await VenueService.createVenue(venueData);
      return res.status(201).json({id: data.id, message: "Venue created successfully" });
    } catch (error) {
      console.error("Error creating venue:", error);
      const appError = error as AppError;
      return res.status(500).json({ message: "Failed to create venue", error: appError.message || "Unknown error" });
    }
  }
}
