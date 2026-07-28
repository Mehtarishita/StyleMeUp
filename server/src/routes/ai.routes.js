import express from 'express';
import { getOutfitRecommendation } from '../controllers/ai.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public route (optional to protect, but let's allow guests if auth middleware isn't strict, or we can mock req.user)
// Wait, protect middleware throws 401 if no token. We will create a custom middleware or just make it public.
// Let's make it public so anyone can try it out! We'll extract user if token exists.
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const optionalAuth = async (req, res, next) => {
  let token = req.cookies?.jwt || (req.headers.authorization?.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-passwordHash');
    } catch (err) {
      // Ignore invalid token for optional auth
    }
  }
  next();
};

router.post('/outfit-recommendation', optionalAuth, getOutfitRecommendation);

export default router;
