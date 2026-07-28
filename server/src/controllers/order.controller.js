import Order from '../models/Order.js';
import User from '../models/User.js';

// @desc    Create new order (Mock checkout)
// @route   POST /api/orders/checkout
// @access  Private
export const checkout = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;
    const user = await User.findById(req.user._id).populate('cart.product');

    if (user.cart.length === 0) {
      return res.status(400).json({ success: false, data: null, message: 'No items in cart' });
    }

    // Prepare order items and calculate totals
    let itemsPrice = 0;
    const orderItems = user.cart.map((item) => {
      const price = item.product.price;
      itemsPrice += price * item.qty;
      return {
        name: item.product.name,
        qty: item.qty,
        image: item.product.images[0],
        price: price,
        size: item.size,
        product: item.product._id,
      };
    });

    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const shippingPrice = itemsPrice > 1000 ? 0 : 50;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: 'Pending',
      paymentStatus: 'Paid', // Mock payment
    });

    // Clear user cart
    user.cart = [];
    await user.save();

    res.status(201).json({ success: true, data: order, message: 'Order placed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders, message: 'Orders retrieved' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, data: null, message: 'Order not found' });
    }

    // Check if user is owner
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, data: null, message: 'Not authorized to view this order' });
    }

    res.json({ success: true, data: order, message: 'Order retrieved' });
  } catch (error) {
    next(error);
  }
};
