import { generateOutfitRecommendation } from './src/services/ai.service.js';

(async () => {
  try {
    const res = await generateOutfitRecommendation({
      occasion: 'Casual Outing',
      budget: 'Flexible',
      gender: 'Women',
      colors: ['Black', 'White'],
      season: 'Summer',
      style: 'Minimalist'
    });
    console.log("Success:", res);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
