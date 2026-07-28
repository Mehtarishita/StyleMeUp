import express from 'express';
import { 
  getWishlist, 
  toggleWishlist, 
  getRecentlyViewed, 
  addRecentlyViewed, 
  getCart, 
  addToCart, 
  removeFromCart 
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect); // All routes are protected

// Wishlist
router.route('/wishlist').get(getWishlist);
router.route('/wishlist/:id').post(toggleWishlist);

// Recently Viewed
router.route('/recently-viewed').get(getRecentlyViewed);
router.route('/recently-viewed/:id').post(addRecentlyViewed);

// Cart
router.route('/cart').get(getCart).post(addToCart);
router.route('/cart/:id').delete(removeFromCart);

export default router;
