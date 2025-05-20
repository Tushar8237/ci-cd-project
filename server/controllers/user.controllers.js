import User from "../models/user.model.js";
import { createError } from "./../utils/custom.error.js";

// Get user
export const getUserProfile = async (req, res, next) => {
    try {
        // The verify user middleware attaches user Id to req.user
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        if (!User) {
            return next(createError(404, "User not found"));
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};
