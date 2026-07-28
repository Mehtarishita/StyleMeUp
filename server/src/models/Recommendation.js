import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Optional for guests
    },
    input: {
      occasion: String,
      budget: String,
      gender: String,
      colors: [String],
      season: String,
      style: String,
    },
    outfit: {
      top: String,
      bottom: String,
      shoes: String,
      accessories: String,
      explanation: String,
    },
    matchedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
