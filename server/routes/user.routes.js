import express from "express";
import { verifyUser } from "../middlewares/verify.token.js";
import { getUserProfile, updateUser } from "../controllers/user.controllers.js";

const router = express.Router();

// Get user
router.get("/profile", verifyUser, getUserProfile);

// Update user
router.put("/update/:id", verifyUser, updateUser);

export default router;
