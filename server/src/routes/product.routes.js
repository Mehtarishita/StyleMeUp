import express from 'express';
import { 
  getProducts, 
  getProductById, 
  getProductReviews, 
  createProductReview 
} from '../controllers/product.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/:id/reviews')
  .get(getProductReviews)
  .post(protect, createProductReview);

export default router;
