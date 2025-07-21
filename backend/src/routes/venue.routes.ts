import { Router } from 'express';
import { CreateVenueController } from '../controllers/venue-controller/createVenue.controller';
import { GetVenueController } from '../controllers/venue-controller/getVenue.controller';
import { UpdateVenueController } from '../controllers/venue-controller/updateVenue.controller';
import { DeleteVenueController } from '../controllers/venue-controller/deleteVenue.controller';
import { ActivityController } from '../controllers/venue-controller/activity-controller/activity.contorller';
import { FacilityController } from '../controllers/venue-controller/facility-controller/facility.contoller';
import { SlotController } from '../controllers/venue-controller/slot-controller/slot.contoller';

const router = Router();

// Venue Routes
router.post('/create-venue', CreateVenueController.createVenue);
router.get('/get-venue/:id', GetVenueController.getVenue);
router.get('/get-all-venues-by-partner/', GetVenueController.getAllVenuesByPartner);
router.put('/update-venue/:id', UpdateVenueController.updateVenue);
router.delete('/delete-venue/:id', DeleteVenueController.deleteVenue);

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

// Slot Routes
router.post('/create-slot', SlotController.createSlot);
router.get('/get-slots-by-facility/:facilityId', SlotController.getSlotsByFacilityId);
router.get('/get-slots-by-date-range-and-facility/:facilityId', SlotController.getSlotsByDateRangeAndFacilityId);
router.put('/update-slot/:id', SlotController.updateSlot);
router.delete('/delete-slot/:id', SlotController.deleteSlot);
router.put('/update-slots/:facilityId', SlotController.updateSlots);
router.post('/create-multiple-slots/:facilityId', SlotController.createSlots);

export default router; 