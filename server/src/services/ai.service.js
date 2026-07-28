import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'fake-key');

export const generateOutfitRecommendation = async (preferences) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    You are an expert fashion stylist. Based on the following user preferences, recommend a complete outfit.
    Preferences:
    - Occasion: ${preferences.occasion}
    - Budget: ${preferences.budget}
    - Gender: ${preferences.gender}
    - Preferred Colors: ${preferences.colors.join(', ')}
    - Season: ${preferences.season}
    - Style: ${preferences.style}

    You MUST return ONLY a raw JSON object (no markdown formatting, no backticks, no comments) with the following exact structure:
    {
      "top": "string description of the top piece",
      "bottom": "string description of the bottom piece",
      "shoes": "string description of the shoes",
      "accessories": "string description of accessories",
      "explanation": "string explaining why this outfit works and fits the preferences"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean up potential markdown formatting if the model disobeys instructions
    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error('Failed to generate outfit recommendation. Please try again.');
  }
};
