import { generateOutfitRecommendation, generateChatResponse } from '../services/ai.service.js';
import Recommendation from '../models/Recommendation.js';
import Conversation from '../models/Conversation.js';
import { findMatch } from '../utils/matching.js';

// @desc    Generate outfit recommendation using AI
// @route   POST /api/ai/outfit-recommendation
// @access  Public
export const getOutfitRecommendation = async (req, res, next) => {
  try {
    const { occasion, budget, gender, colors, season, style } = req.body;

    if (!occasion || !gender || !season || !style) {
      return res.status(400).json({ success: false, data: null, message: 'Please provide occasion, gender, season, and style.' });
    }

    const aiOutfit = await generateOutfitRecommendation({
      occasion,
      budget: budget || 'flexible',
      gender,
      colors: colors || [],
      season,
      style
    });

    const matchedTop = await findMatch(aiOutfit.top, gender);
    const matchedBottom = await findMatch(aiOutfit.bottom, gender);
    const matchedShoes = await findMatch(aiOutfit.shoes, gender);
    const matchedAccessories = await findMatch(aiOutfit.accessories, gender);

    const matchedProducts = [matchedTop, matchedBottom, matchedShoes, matchedAccessories].filter(Boolean);

    const recommendation = await Recommendation.create({
      user: req.user ? req.user._id : null,
      input: { occasion, budget, gender, colors, season, style },
      outfit: aiOutfit,
      matchedProducts
    });

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

// @desc    Chat with AI Stylist
// @route   POST /api/ai/stylist-chat
// @access  Public
export const postChatMessage = async (req, res, next) => {
  try {
    const { conversationId, message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    let conversation;
    let history = [];

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) return res.status(404).json({ success: false, message: 'Conversation not found' });
      history = conversation.messages.map(m => ({ role: m.role, content: m.content }));
    } else {
      conversation = new Conversation({ user: req.user ? req.user._id : null, messages: [] });
    }

    // Save user message immediately
    conversation.messages.push({ role: 'user', content: message });
    await conversation.save();

    // Generate AI response
    const aiResponse = await generateChatResponse(history, message);

    // Process search queries to match products
    const matchedProductIds = [];
    if (aiResponse.searchQueries && aiResponse.searchQueries.length > 0) {
      for (const query of aiResponse.searchQueries) {
        const match = await findMatch(query.keyword, query.gender);
        if (match) {
          matchedProductIds.push(match);
        }
      }
    }

    // Save assistant message
    const assistantMessage = {
      role: 'assistant',
      content: aiResponse.reply,
      recommendedProducts: matchedProductIds
    };

    conversation.messages.push(assistantMessage);
    await conversation.save();

    // Return the updated conversation populated with products
    const populatedConversation = await Conversation.findById(conversation._id).populate('messages.recommendedProducts');

    res.status(200).json({
      success: true,
      data: populatedConversation,
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ success: false, data: null, message: error.message || 'Failed to communicate with Stylist' });
  }
};
