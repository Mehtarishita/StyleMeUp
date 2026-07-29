import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'fake-key');

export const generateOutfitRecommendation = async (preferences) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

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

export const generateChatResponse = async (history, newMessage) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  // Build a plain text prompt including history
  let promptText = `You are an expert fashion stylist assistant. You help users find outfits.
Respond to the user naturally and helpfully.
If the user's message implies they need a specific outfit or item recommendation (e.g. "I have a wedding", "I need a red dress"), you MUST include a "searchQueries" array in your JSON response with specific clothing descriptions so we can search our catalog for them.
Otherwise, if they are just chatting or saying hi, leave "searchQueries" empty.

You MUST return ONLY a raw JSON object (no markdown formatting, no backticks, no comments) with the following exact structure:
{
  "reply": "Your natural language response to the user",
  "searchQueries": [
    {
      "keyword": "string describing the specific item (e.g., 'elegant red dress' or 'black leather boots')",
      "gender": "string ('Women', 'Men', or 'Unisex')"
    }
  ]
}

Conversation History:
`;

  history.forEach(msg => {
    promptText += `${msg.role === 'assistant' ? 'Stylist' : 'User'}: ${msg.content}\n`;
  });

  promptText += `User: ${newMessage}\nStylist: `;

  try {
    const result = await model.generateContent(promptText);
    const text = result.response.text();
    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('AI Chat Error:', error);
    throw new Error('Failed to communicate with AI Stylist.');
  }
};

export const analyzeImage = async (mimeType, base64Data) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
  
  const prompt = `
    You are an expert fashion stylist and visual search engine. 
    Analyze this image and describe the primary garment or fashion accessory in a concise string of keywords. 
    Include the garment type, color, pattern, material, style, and any defining features. 
    Do NOT write full sentences. Return ONLY the raw keyword string.
    Example output: "red floral midi dress summer short sleeves casual"
  `;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: base64Data
        }
      }
    ]);
    return result.response.text().trim();
  } catch (error) {
    console.error('AI Image Analysis Error:', error);
    throw new Error('Failed to analyze image.');
  }
};
