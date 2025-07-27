import { Request, Response } from "express";
import { Activity } from "../../../models/venue.model";
import ActivityService from "../../../services/venue-services/activity.service";

export class ActivityController {
  static async createActivity(req: Request, res: Response) {
    try {
      const { name, tags, start_price_per_hour, venueId } = req.body;

      if (!name || !tags || !start_price_per_hour || !venueId) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const activity: Activity = {
        name,
        start_price_per_hour,
        venueId,
        tags,
      };

      const newActivity = await ActivityService.createActivity(activity);

      return res.status(201).json({ id: newActivity.id });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create activity" });
    }
  }

  static async getActivitiesByVenue(req: Request, res: Response) {
    try {
      const { venueId } = req.params;

      if (!venueId) {
        return res
          .status(400)
          .json({ message: "Venue ID is required in params" });
      }

      const activity = await ActivityService.getActivitiesByVenue(venueId);
      return res.status(200).json({ data: activity });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get activity" });
    }
  }

  static async getActivityById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Activity ID and Venue ID are required" });
      }

      const activity = await ActivityService.getActivityById(id);
      return res.status(200).json({ data: activity });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get activity" });
    }
  }

  static async updateActivity(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ message: "Activity ID and Venue ID are required" });
      }

      const activity = await ActivityService.getActivityById(id);

      if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }

      const newActivity: Activity = {
        name : req.body.name || activity.name,
        tags : req.body.tags || activity.tags,
        start_price_per_hour : req.body.start_price_per_hour || activity.start_price_per_hour,

      };

      const updatedActivity = await ActivityService.updateActivity(id, newActivity);

      return res.status(200).json({ data: updatedActivity.id });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update activity" });
    }
  }

  static async deleteActivity(req: Request, res: Response) {
    try {
      const { id} = req.params;

      if (!id) {  
        return res.status(400).json({ message: "Activity ID is required" });
      }

      const activity = await ActivityService.getActivityById(id);

      if(!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }

      const deletedActivity = await ActivityService.deleteActivity(id);

      return res.status(200).json({ data: deletedActivity.id });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete activity" });
    }
  }
}
