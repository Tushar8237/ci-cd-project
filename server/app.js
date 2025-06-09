import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import masterClassRoutes from './routes/masterClass.routes.js'
import { errorHandler } from "./middlewares/error.handler.js";
import { rateLimiter } from './middlewares/rateLimiter.js';

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
app.use(rateLimiter); // Apply rate limiting to all routes

// Routes
app.get("/", (req, res) => {
  res.send("Fast route response");
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes)
app.use('/api/v1', masterClassRoutes)


// Error handler (must be after all routes)
app.use(errorHandler);

export default app;
