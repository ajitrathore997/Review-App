import Review from "../models/Review.js";
import Company from "../models/Company.js";


export const AddReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    await Company.findByIdAndUpdate(req.body.company, {
      $push: { reviews: review._id },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const GetCompanyReviews = async (req, res) => {
  try {
    const { sortBy } = req.query;
    let sortOption = {};
    if (sortBy === "date") sortOption.createdAt = -1;
    if (sortBy === "rating") sortOption.rating = -1;

    const reviews = await Review.find({ company: req.params.companyId }).sort(
      sortOption
    );
    const averageRating = reviews.length
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

    res.json({ reviews, averageRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
