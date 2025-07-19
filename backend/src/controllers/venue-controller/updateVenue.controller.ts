import { Request, Response } from "express";
import { AppError } from "../../types";
import { VenueService } from "../../services/venue.service";
import { Venue } from "../../models/venue.model";

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

      const venue: Venue = {
        name : req.body.name ?? venueData.name,
        description : req.body.description ?? venueData.description,
        highlight : req.body.highlight ?? venueData.highlight,
        main : req.body.main ?? venueData.main,
        rating : req.body.rating ?? venueData.rating,
        start_price_per_hour : req.body.start_price_per_hour ?? venueData.start_price_per_hour,
        detailDescription : req.body.detailDescription ?? venueData.detailDescription,
        features : req.body.features ?? venueData.features,
        city : req.body.city ?? venueData.city,
        state : req.body.state ?? venueData.state,
        country : req.body.country ?? venueData.country,
        zip : req.body.zip ?? venueData.zip,
        phone : req.body.phone ?? venueData.phone,
        mapLocationLink : req.body.mapLocationLink ?? venueData.mapLocationLink,
        cancellationPolicy : req.body.cancellationPolicy ?? venueData.cancellationPolicy,
        partnerId : req.body.partnerId ?? venueData.partnerId,
        location : req.body.location ?? venueData.location,
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
