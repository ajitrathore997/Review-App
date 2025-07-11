import express from "express";
import {
  GetAllcompanies,
  companyAdd,
  GetCities,
  GetSinglecompanies
} from "../controllers/companyController.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/companyAdd", upload.single('logo'), companyAdd);
router.get("/GetAllcompanies", GetAllcompanies);
router.get("/GetCities", GetCities);
router.get("/GetSinglecompanies/:id", GetSinglecompanies);

export default router;
