import express from 'express';
import { getAddresses, createAddress } from '../controllers/address.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getAddresses)
  .post(createAddress);

export default router;
