import express from 'express';
import { getOutfitRecommendation, postChatMessage, processImageSearch, getOutfitSurprise } from '../controllers/ai.controller.js';
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
router.post('/outfit-generator', optionalAuth, getOutfitSurprise);
router.post('/stylist-chat', optionalAuth, postChatMessage);

import multer from 'multer';
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/image-search', optionalAuth, upload.single('image'), processImageSearch);

export default router;
