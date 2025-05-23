import Joi from "joi";

export const masterClassSchema = Joi.object({
    courseName : Joi.string().required(),
    batchDate : Joi.string().required(),
    currentFees : Joi.number().required(),
    discount : Joi.number().required(),
    discountDate : Joi.string().required(),
    classTimings : Joi.string().required(),
})