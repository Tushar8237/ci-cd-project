import User from "../models/user.model.js";
import { createError } from "./../utils/custom.error.js";

export const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
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

// Update user profile
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        });

        if (!user) {
            return next(createError(404, "User not found"));
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Upload file
export const uploadFile = (req, res, next) => {
    try {
        if (!req.file) {
            return createError(404, "No file uploaded");
        }

        res.status(200).json({
            message: 'File uploaded successfully',
            filename : req.file.filename,
            path : req.file.path
        })
    } catch (error) {
        next(error)
    }
};
