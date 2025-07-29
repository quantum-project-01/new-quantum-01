import { Router } from 'express';
import { MembershipController } from '../../controllers/membership-controller/membership.controller';
import { authMiddleware} from '../../middleware/auth.middleware';

const router = Router();

// Membership Routes
router.post('/create-membership', authMiddleware, MembershipController.createMembershipBeforePayment);
router.post('/create-order', authMiddleware, MembershipController.createMembershipOrder);
router.post('/verify-payment', authMiddleware, MembershipController.verifyMembershipPayment);
router.get('/user-memberships', authMiddleware, MembershipController.getUserMemberships);

// Development only - seed data
router.post('/seed-plans', MembershipController.seedMembershipPlans);

export default router; 