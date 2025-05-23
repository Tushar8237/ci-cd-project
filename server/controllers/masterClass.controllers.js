import MasterClass from "../models/masterClass.model.js";
import { createError } from "./../utils/custom.error.js";

// Add master class
export const addMasterClass = async (req, res, next) => {
    try {
        const {
            courseName,
            batchDate,
            currentFees,
            discount,
            discountDate,
            classTimings,
        } = req.body;

        if (
            !courseName ||
            !batchDate ||
            !currentFees ||
            !discount ||
            !discountDate ||
            !classTimings
        ) {
            return next(createError(400, "All field required"));
        }

        const masterClass = new MasterClass({
            courseName,
            batchDate,
            currentFees,
            discount,
            discountDate,
            classTimings,
        });

        await masterClass.save();

        return res.status(200).json({
            success: true,
            message: "Master class added successfully",
            masterClass,
        });
    } catch (error) {
        next(error);
    }
};

// get master class by ID
export const getMasterClass = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find master class by id
        const masterClass = await MasterClass.findById(id);

        if (!masterClass) {
            return next(createError(404, "Master class not found"));
        }

        return res.status(200).json({
            success: true,
            masterClass,
        });
    } catch (error) {
        next(error);
    }
};

// get master class by ID
export const getAllMasterClass = async (req, res, next) => {
    try {
        // Find master class by id
        const masterClass = await MasterClass.find();

        if (!masterClass) {
            return next(createError(404, "No data found"));
        }

        return res.status(200).json({
            success: true,
            masterClass,
        });
    } catch (error) {
        next(error);
    }
};

export const updateMasterClass = async (req, res, next) => {
    try {
        const { id } = req.params;

        const masterClass = await MasterClass.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );

        if (!masterClass) {
            return next(
                createError(404),
                "Master class not found or only admin can update the master class"
            );
        }

        return res.status(201).json({
            success: true,
            message: "Master class update successfully",
            masterClass,
        });
    } catch (error) {
        next(error);
    }
};

// Delete master class
export const deleteMasterClass = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(createError(400, "Invalid user Id"));
        }

        await MasterClass.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Master class deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
