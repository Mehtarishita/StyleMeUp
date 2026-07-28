import Product from '../models/Product.js';
import Review from '../models/Review.js';

// @desc    Fetch all products with filtering, sorting, pagination, and text search
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { 
      keyword, 
      category, 
      gender, 
      color, 
      minPrice, 
      maxPrice, 
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = {};

    // Text Search using MongoDB Text Index
    if (keyword) {
      query.$text = { $search: keyword };
    }

    if (category) query.category = category;
    if (gender) query.gender = gender;
    if (color) query.colors = { $in: [new RegExp(color, 'i')] };
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sorting logic
    let sortObj = {};
    if (sort === 'price_asc') sortObj.price = 1;
    else if (sort === 'price_desc') sortObj.price = -1;
    else if (sort === 'rating') sortObj.rating = -1;
    else if (sort === 'newest') sortObj.createdAt = -1;
    // If text searching, sort by text score by default if no sort provided
    else if (keyword) sortObj = { score: { $meta: 'textScore' } };
    else sortObj.createdAt = -1;

    const skip = (Number(page) - 1) * Number(limit);

    // If searching text, we need to project the score
    const projection = keyword ? { score: { $meta: 'textScore' } } : {};

    const products = await Product.find(query, projection)
      .populate('category', 'name slug')
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
      message: 'Products retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({ success: false, data: null, message: 'Product not found' });
    }
    res.json({ success: true, data: product, message: 'Product retrieved successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: reviews, message: 'Reviews retrieved' });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, data: null, message: 'Product not found' });
    }

    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, data: null, message: 'Product already reviewed' });
    }

    await Review.create({
      product: productId,
      user: req.user._id,
      rating: Number(rating),
      comment,
    });

    // Update product overall rating and count
    const reviews = await Review.find({ product: productId });
    product.numReviews = reviews.length;
    product.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await product.save();

    res.status(201).json({ success: true, data: null, message: 'Review added successfully' });
  } catch (error) {
    next(error);
  }
};
