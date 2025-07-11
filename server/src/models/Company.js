import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  foundedOn: { type: Date, required: true },
  city: { type: String, required: true },
  logo: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

export default mongoose.model("Company", companySchema);
