import { Request, Response } from "express";
import { AppError } from "../../types";
import { VenueService } from "../../services/venue.service";
import { Location, Venue } from "../../models/venue.model";

export class UpdateVenueController {
  static async updateVenue(req: Request, res: Response) {
    const { id } = req.params;
    
    try {
      if (!id) {
        return res.status(400).json({ message: "Venue ID is required" });
      }
      const venueData = await VenueService.getVenue(id);
      if (!venueData) {
        return res.status(404).json({ message: "Venue not found" });
      }
      const location = venueData.location as unknown as Location;
      
      const address = `${req.body.city}, ${req.body.state}, ${req.body.country}, ${req.body.zip}`;

      const venue: Venue = {
        name : req.body.name ?? venueData.name,
        description : req.body.description ?? venueData.description,
        highlight : req.body.highlight ?? venueData.highlight,
        location : {
          address,
          city: req.body.city ?? location.city,
          state: req.body.state ?? location.state,
          country: req.body.country ?? location.country,
          pincode: req.body.zip ?? location.pincode,
          coordinates: req.body.coordinates ?? location.coordinates,
        },
        images: req.body.images ?? venueData.images,
        rating : req.body.rating ?? venueData.rating,
        start_price_per_hour : req.body.start_price_per_hour ?? venueData.start_price_per_hour,
        features : req.body.features ?? venueData.features,
        phone : req.body.phone ?? venueData.phone,
        mapLocationLink : req.body.mapLocationLink ?? venueData.mapLocationLink,
        cancellationPolicy : req.body.cancellationPolicy ?? venueData.cancellationPolicy,
        partnerId : req.body.partnerId ?? venueData.partnerId,
        details : req.body.details ?? venueData.details,
        createdAt : venueData.createdAt,
        updatedAt : new Date(),
      };

      const updatedVenue = await VenueService.updateVenue(id, venue);

      return res.status(200).json({
        data: updatedVenue.id,
        message: "Venue updated successfully",
      });
    } catch (error) {
      console.error("Error updating venue:", error);
      const appError = error as AppError;
      return res
        .status(500)
        .json({
          message: "Failed to update venue",
          error: appError.message || "Unknown error",
        });
    }
  }
}
