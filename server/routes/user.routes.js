import express from "express";
import { verifyUser } from "../middlewares/verify.token.js";
import { getUserProfile, updateUser, uploadFile } from "../controllers/user.controllers.js";
import upload from './../middlewares/upload.middleware.js';

const router = express.Router();

// Get user
router.get("/profile", verifyUser, getUserProfile);

// Update user
router.put("/update/:id", verifyUser, updateUser);

// Upload file
router.post('/upload', upload.single('file'), uploadFile)

export default router;
