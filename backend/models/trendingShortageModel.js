import mongoose from 'mongoose';

const trendingShortageSchema = new mongoose.Schema(
  {

    shortageUPC: { type: String, required: true },
    shortageName: { type: String, required: true },
    shortagePicLink: { type: String, required: true },
    shortagePrice: { type: Number, required: true },
    shortageRegisterers: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);
const TrendingShortage = mongoose.model('trendingShortages', trendingShortageSchema);

export default TrendingShortage;