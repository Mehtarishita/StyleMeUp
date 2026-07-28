import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json({ success: true, data: user.wishlist, message: 'Wishlist retrieved' });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle product in wishlist
// @route   POST /api/users/wishlist/:id
// @access  Private
export const toggleWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.id;

    const isLiked = user.wishlist.includes(productId);
    if (isLiked) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    
    // Return populated wishlist for UI updates
    const updatedUser = await User.findById(req.user._id).populate('wishlist');
    res.json({ success: true, data: updatedUser.wishlist, message: isLiked ? 'Removed from wishlist' : 'Added to wishlist' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user recently viewed
// @route   GET /api/users/recently-viewed
// @access  Private
export const getRecentlyViewed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('recentlyViewed');
    res.json({ success: true, data: user.recentlyViewed, message: 'Recently viewed retrieved' });
  } catch (error) {
    next(error);
  }
};

// @desc    Add to recently viewed
// @route   POST /api/users/recently-viewed/:id
// @access  Private
export const addRecentlyViewed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.id;

    // Remove if already exists to move it to the front
    user.recentlyViewed = user.recentlyViewed.filter(id => id.toString() !== productId);
    user.recentlyViewed.unshift(productId); // Add to beginning

    // Keep only last 10
    if (user.recentlyViewed.length > 10) {
      user.recentlyViewed = user.recentlyViewed.slice(0, 10);
    }

    await user.save();
    res.json({ success: true, data: null, message: 'Added to recently viewed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user cart
// @route   GET /api/users/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json({ success: true, data: user.cart, message: 'Cart retrieved' });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart or update qty
// @route   POST /api/users/cart
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, qty, size } = req.body;
    const user = await User.findById(req.user._id);

    const existingItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId && item.size === size
    );

    if (existingItemIndex >= 0) {
      user.cart[existingItemIndex].qty = qty;
    } else {
      user.cart.push({ product: productId, qty, size });
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json({ success: true, data: updatedUser.cart, message: 'Cart updated' });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/users/cart/:id
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const itemId = req.params.id; // Cart item subdocument ID
    const user = await User.findById(req.user._id);
    
    user.cart = user.cart.filter(item => item._id.toString() !== itemId);
    await user.save();
    
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json({ success: true, data: updatedUser.cart, message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
};
