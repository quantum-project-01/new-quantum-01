import { Router } from 'express';
import { MembershipController } from '../../controllers/membership-controller/membership.controller';
import { MembershipPlanController } from '../../controllers/membership-controller/membershipPlan.controller';
import { authMiddleware} from '../../middleware/auth.middleware';

const router = Router();

// Membership Routes
router.post('/create-membership', authMiddleware, MembershipController.createMembershipBeforePayment);
router.post('/create-order/:id', authMiddleware, MembershipController.createMembershipOrder);
router.post('/verify-payment', authMiddleware, MembershipController.verifyMembershipPayment);
router.get('/user-memberships', authMiddleware, MembershipController.getUserMemberships);

router.get('/plans', MembershipPlanController.getActiveMembershipPlans);

// Development only - seed data
router.post('/seed-plans', MembershipController.seedMembershipPlans);

export default router; 