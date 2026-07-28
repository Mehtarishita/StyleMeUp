import Address from '../models/Address.js';

// @desc    Get user addresses
// @route   GET /api/addresses
// @access  Private
export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ success: true, data: addresses, message: 'Addresses retrieved' });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new address
// @route   POST /api/addresses
// @access  Private
export const createAddress = async (req, res, next) => {
  try {
    const addressData = { ...req.body, user: req.user._id };
    
    // If this is the first address or marked default, un-default others
    if (addressData.isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    } else {
      const count = await Address.countDocuments({ user: req.user._id });
      if (count === 0) addressData.isDefault = true;
    }

    const address = await Address.create(addressData);
    res.status(201).json({ success: true, data: address, message: 'Address created' });
  } catch (error) {
    next(error);
  }
};
