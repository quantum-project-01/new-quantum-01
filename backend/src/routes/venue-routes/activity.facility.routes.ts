import { Router } from "express";
import { FacilityController } from "../../controllers/venue-controller/facility-controller/facility.contoller";
import { ActivityController } from "../../controllers/venue-controller/activity-controller/activity.contorller";

const router = Router();

// Activity Routes
router.post('/create-activity', ActivityController.createActivity);
router.get('/get-activities-by-venue/:venueId', ActivityController.getActivitiesByVenue);
router.get('/get-activity-by-id/:id', ActivityController.getActivityById);
router.put('/update-activity/:id', ActivityController.updateActivity);
router.delete('/delete-activity/:id', ActivityController.deleteActivity);

// Facility Routes
router.post('/create-facility', FacilityController.createFacility);
router.get('/get-facilities-by-activity/:activityId', FacilityController.getFacilitiesByActivity);
router.get('/get-facility-by-id/:id', FacilityController.getFacilityById);
router.put('/update-facility/:id', FacilityController.updateFacility);
router.delete('/delete-facility/:id', FacilityController.deleteFacility);

export default router;