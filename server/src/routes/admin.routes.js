import express from 'express';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import {
  getAnalyticsSummary,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateOrderStatus,
  getAdminUsers,
  updateUserRole
} from '../controllers/admin.controller.js';

const router = express.Router();

// All routes here are protected and restricted to 'admin' role
router.use(protect);
router.use(authorize('admin'));

// Analytics
router.get('/analytics/summary', getAnalyticsSummary);

// Products
router.route('/products')
  .get(getAdminProducts)
  .post(createProduct);
  
router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

// Orders
router.route('/orders')
  .get(getAdminOrders);
  
router.route('/orders/:id/status')
  .put(updateOrderStatus);

// Users
router.route('/users')
  .get(getAdminUsers);
  
router.route('/users/:id/role')
  .put(updateUserRole);

export default router;
