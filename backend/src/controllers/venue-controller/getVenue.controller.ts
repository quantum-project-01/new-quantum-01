import { Request, Response } from "express";
import { AppError } from "../../types";
import { PartnerVenueMapService } from "../../services/venue-services/partnerVenueMap.service";
import { VenueService } from "../../services/venue-services/venue.service";

export class GetVenueController {
  static async getVenue(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Venue ID is required" });
      }

      const venue = await VenueService.getVenue(id);

      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }

      // Construct a Venue object to send to the frontend
      const venueObj = {
        id: venue.id,
        name: venue.name,
        location: venue.location,
        description: venue.description,
        highlight: venue.highlight,
        rating: venue.rating,
        start_price_per_hour: venue.start_price_per_hour,
        createdAt: venue.createdAt,
        updatedAt: venue.updatedAt,
        features: venue.features,
        phone: venue.phone,
        mapLocationLink: venue.mapLocationLink,
        cancellationPolicy: venue.cancellationPolicy,
        partnerId: venue.partnerId,
      };

      return res.status(200).json({
        data: venueObj,
        message: "Venue fetched successfully",
      });
    } catch (error) {
      const appError = error as AppError;
      return res.status(500).json({
        message: "Internal server error",
        error: appError.message || "Unknown error",
      });
    }
  }

  static async getAllVenuesByPartner(req: Request, res: Response) {
    try {
      const partnerId = req.query["partnerId"] as string;
      
      const { page = 1, limit = 10 } = req.body as {
        page: number;
        limit: number;
      };

      if (!partnerId) {
        return res.status(400).json({ message: "Partner ID is required" });
      }

      const venues = await PartnerVenueMapService.getVenuesByPartner(
        partnerId,
        page,
        limit
      );

      console.log(venues);
      if (!venues || venues.length === 0) {
        return res.status(404).json({ message: "No venues found" });
      }

      const venuesObj = venues.map((venue) => ({
        id: venue.id,
        name: venue.name,
        location: venue.location,
        description: venue.description,
        highlight: venue.highlight,
        rating: venue.rating,
        images: venue.images,
        start_price_per_hour: venue.start_price_per_hour,
        createdAt: venue.createdAt,
        updatedAt: venue.updatedAt,
        features: venue.features,
        phone: venue.phone,
        mapLocationLink: venue.mapLocationLink,
        cancellationPolicy: venue.cancellationPolicy,
        partnerId: venue.partnerId,
      }));

      return res.status(200).json({
        data: venuesObj,
        message: "Venues fetched successfully",
        total: venues.length,
      });
    } catch (error) {
      const appError = error as AppError;
      return res.status(500).json({
        message: "Internal server error",
        error: appError.message || "Unknown error",
      });
    }
  }

  static async getAllVenues(req: Request, res: Response) {
    try {
      const { page, limit, search, event, city } = req.query;

      const data = await VenueService.getAllVenues({
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 10,
        search: search as string | undefined,
        event: event as string | undefined,
        city: city as string | undefined,
      });

      const venuesObj = data.venues.map((venue) => ({
        id: venue.id,
        name: venue.name,
        location: venue.location,
        description: venue.description,
        highlight: venue.highlight,
        rating: venue.rating,
        images: venue.images,
        start_price_per_hour: venue.start_price_per_hour,
        createdAt: venue.createdAt,
        updatedAt: venue.updatedAt,
        features: venue.features,
        phone: venue.phone,
        mapLocationLink: venue.mapLocationLink,
        cancellationPolicy: venue.cancellationPolicy,
        partnerId: venue.partnerId,
      }));

      return res.status(200).json({
        message: "Venues fetched successfully",
        data: venuesObj,
      });
    } catch (error) {
      const appError = error as Error;
      return res.status(500).json({
        message: "Internal server error",
        error: appError.message || "Unknown error",
      });
    }
  }
}
