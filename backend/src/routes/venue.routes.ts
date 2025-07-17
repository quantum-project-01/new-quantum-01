import { Router } from 'express';
import { CreateVenueController } from '../controllers/createVenue.controller';

const router = Router();

router.post('/create-venue', CreateVenueController.createVenue);

export default router; 