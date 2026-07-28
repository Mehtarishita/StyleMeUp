import { generateOutfitRecommendation } from '../services/ai.service.js';
import Recommendation from '../models/Recommendation.js';
import Product from '../models/Product.js';

// @desc    Generate outfit recommendation using AI
// @route   POST /api/ai/outfit-recommendation
// @access  Public
export const getOutfitRecommendation = async (req, res, next) => {
  try {
    const { occasion, budget, gender, colors, season, style } = req.body;

    // Validate inputs
    if (!occasion || !gender || !season || !style) {
      return res.status(400).json({ success: false, data: null, message: 'Please provide occasion, gender, season, and style.' });
    }

    // 1. Call AI Service
    const aiOutfit = await generateOutfitRecommendation({
      occasion,
      budget: budget || 'flexible',
      gender,
      colors: colors || [],
      season,
      style
    });

    // 2. Match AI descriptions against real products in DB
    // We will do a basic text search or attribute match to find products in stock
    const findMatch = async (keyword, categoryRegex, preferredGender) => {
      // Build a search query
      const query = {
        gender: { $in: [preferredGender, 'Unisex'] }
      };

      // We don't have category models deeply mapped to "top"/"bottom" string in DB directly via names all the time,
      // so we use text search on the generated description, or just basic regex matching.
      // For a robust system, we would embed vectors. For this phase, we do a text match on tags/name/description.
      
      const searchTerms = keyword.split(' ').filter(w => w.length > 3).join(' ');
      
      let products = [];
      if (searchTerms) {
        products = await Product.find(
          { $text: { $search: searchTerms }, ...query },
          { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }).limit(2).populate('category');
      }

      // Fallback: If text search yields nothing, just pick a random highly rated product in that gender
      if (products.length === 0) {
        products = await Product.find({ ...query }).sort({ rating: -1 }).limit(5);
        // Shuffle fallback
        products = products.sort(() => 0.5 - Math.random());
      }

      return products.length > 0 ? products[0]._id : null;
    };

    // Find matches for each component
    const matchedTop = await findMatch(aiOutfit.top, /top|shirt|t-shirt|blouse|jacket/i, gender);
    const matchedBottom = await findMatch(aiOutfit.bottom, /bottom|pants|jeans|skirt|shorts/i, gender);
    const matchedShoes = await findMatch(aiOutfit.shoes, /shoes|sneakers|boots|heels/i, gender);
    const matchedAccessories = await findMatch(aiOutfit.accessories, /accessory|watch|bag|belt/i, gender);

    const matchedProducts = [matchedTop, matchedBottom, matchedShoes, matchedAccessories].filter(Boolean);

    // 3. Save Recommendation to DB
    const recommendation = await Recommendation.create({
      user: req.user ? req.user._id : null,
      input: { occasion, budget, gender, colors, season, style },
      outfit: aiOutfit,
      matchedProducts
    });

    // 4. Return populated recommendation
    const populatedRecommendation = await Recommendation.findById(recommendation._id).populate('matchedProducts');

    res.status(200).json({
      success: true,
      data: populatedRecommendation,
      message: 'Outfit generated successfully'
    });

  } catch (error) {
    console.error('AI Controller Error:', error);
    res.status(500).json({ success: false, data: null, message: error.message || 'Failed to generate recommendation' });
  }
};
