import express from 'express';
import { checkout, getMyOrders, getOrderById } from '../controllers/order.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/checkout').post(checkout);
router.route('/').get(getMyOrders);
router.route('/:id').get(getOrderById);

export default router;
