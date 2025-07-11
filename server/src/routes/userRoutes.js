import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/get-user", protect, getUser);

export default router;
