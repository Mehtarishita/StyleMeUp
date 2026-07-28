import Product from '../models/Product.js';

export const findMatch = async (keyword, preferredGender = 'Women') => {
  if (!keyword) return null;

  // Build a search query based on gender
  const query = {
    gender: { $in: [preferredGender, 'Unisex'] }
  };

  // Ensure we don't crash on small words by filtering to words > 3 chars
  const searchTerms = keyword.split(' ').filter(w => w.length > 2).join(' ');
  
  let products = [];
  if (searchTerms) {
    products = await Product.find(
      { $text: { $search: searchTerms }, ...query },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } }).limit(2).populate('category');
  }

  // Fallback: If text search yields nothing, pick a random highly rated product in that gender
  if (products.length === 0) {
    products = await Product.find({ ...query }).sort({ rating: -1 }).limit(5);
    // Shuffle fallback
    products = products.sort(() => 0.5 - Math.random());
  }

  return products.length > 0 ? products[0]._id : null;
};
