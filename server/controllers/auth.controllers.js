import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { createError } from "../utils/custom.error.js";
import { generateRefreshToken, generateToken } from "../utils/jwt.token.js";

// Register user
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return next(createError(400, "User already exists"));
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // save user
        await user.save();

        // Generate token
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user)

        // Set token in cookie
        res.cookie("access_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // remove password
        let userWithoutPass = user.toObject();

        delete userWithoutPass.password;

        // send response
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            userWithoutPass,
            token,
        });
    } catch (error) {
        next(error);
    }
};

// Login user
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // check existing user
        const user = await User.findOne({ email });

        if (!user) {
            return next(createError(404, "User not found or invalid credential"));
        }

        // hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // Throw error
        if (!isMatch) {
            return next(createError(404, "User not found or invalid credential"));
        }

        // Generate token
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user)

        // Set token in cookie
        res.cookie("access_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // remove password
        let userWithoutPass = user.toObject();

        delete userWithoutPass.password;

        // send response
        return res.status(201).json({
            success: true,
            message: "User login successfully",
            userWithoutPass,
            token,
        });
    } catch (error) {
        next(error);
    }
};


// Logout user
export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("access_token")

        return res.status(201).json({
            success : true,
            message : "Logout Successfully"
        })
    } catch (error) {
        next(error)
    }
}