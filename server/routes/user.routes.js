import express from "express";
import { verifyUser } from "../middlewares/verify.token.js";
import { getUserProfile } from "../controllers/user.controllers.js";

const router = express.Router();

// Register user
router.get("/profile", verifyUser, getUserProfile);

export default router;