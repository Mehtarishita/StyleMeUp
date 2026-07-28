import express from 'express';
import { getOutfitRecommendation, postChatMessage } from '../controllers/ai.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

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
router.post('/stylist-chat', optionalAuth, postChatMessage);

export default router;
