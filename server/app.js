// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from "./middlewares/error.handler.js";

// Load env vars
dotenv.config();

// DB connection
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Test API is running");
});
app.use('/api/v1', authRoutes);

// Error handler (must be after all routes)
app.use(errorHandler);

export default app;
