import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/userRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import path from 'path';
import connectDB from "./src/config/db.js";
import { fileURLToPath } from 'url'; // 👈 Add this
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
connectDB();

const app = express();
app.use('/uploads', express.static('uploads'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Fixed
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
