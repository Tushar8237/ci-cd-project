import mongoose from "mongoose";

const masterClassSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true,
        },
        batchDate: {
            type: String,
            required: true,
        },
        currentFees: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        discountDate: {
            type: String,
            required: true,
        },
        classTimings: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const MasterClass = mongoose.model('masterClass', masterClassSchema);
export default MasterClass
