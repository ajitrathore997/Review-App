import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  fullName: { type: String, required: true },
  subject: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
