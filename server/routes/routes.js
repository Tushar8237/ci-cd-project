import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";
import validation from "../middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

const router = express.Router();

// Register user
router.post("/register", validation(registerSchema), registerUser);
router.post("/login", validation(loginSchema), loginUser);

export default router;
