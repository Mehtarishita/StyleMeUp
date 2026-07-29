import mongoose from 'mongoose';

const aiLogSchema = new mongoose.Schema(
  {
    feature: {
      type: String,
      enum: ['outfit-recommendation', 'stylist-chat', 'image-search', 'outfit-generator'],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Optional for guests
    }
  },
  {
    timestamps: true,
  }
);

const AILog = mongoose.model('AILog', aiLogSchema);
export default AILog;
