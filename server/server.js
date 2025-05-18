// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import cookieParser from "cookie-parser";
// import authRoutes from './routes/auth.routes.js'
// import { errorHandler } from "./middlewares/error.handler.js";

// // Env variable
// dotenv.config();

// const port = process.env.PORT || 5000;
// const app = express();

// // Database
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

// // Example route
// app.get("/", (req, res) => {
//     res.send("Test api is running");
// });

// // Routes
// app.use('/api/v1', authRoutes) 

// // Global error handler
// app.use(errorHandler)

// // Server
// app.listen(port, () => {
//     console.log(`server is running on http://localhost:${port}`);
// });


// server.js
import app from './app.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
