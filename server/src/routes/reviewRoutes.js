import express from "express";
import {
  AddReview,
  GetCompanyReviews
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/AddReview", AddReview);
router.get('/GetCompanyReviews/:companyId', GetCompanyReviews);

export default router;
