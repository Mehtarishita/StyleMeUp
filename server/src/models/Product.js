import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    brand: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Men', 'Women', 'Unisex'],
      required: true,
    },
    colors: [String],
    sizes: [String],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    originalPrice: {
      type: Number, // Useful for showing discounts
    },
    occasion: [String],
    season: [String],
    images: [String],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// ============================================================================
// INDEXES EXPLANATION
// ============================================================================

// 1. Compound Index:
// We create a compound index on category, gender, and price because these are
// the most common fields used for filtering and sorting on an e-commerce product
// listing page (e.g. "Show me Women's Tops sorted by Price Low to High").
// A compound index allows MongoDB to efficiently narrow down the dataset and sort
// it simultaneously without scanning the entire collection or sorting in memory.
productSchema.index({ category: 1, gender: 1, price: 1 });

// 2. Text Index:
// We create a text index on name, description, and tags to enable native MongoDB
// full-text search. This allows the user to type a query like "summer party dress"
// into a search bar, and MongoDB will intelligently score and return relevant products
// by searching across all three of these string fields efficiently, without needing
// complex regex scans.
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
