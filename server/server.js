import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import dealRoutes from './src/routes/dealRoutes.js';

// import connectDB from "./src/config/db.js";

dotenv.config();
// connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors()
);

app.use('/api', dealRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
