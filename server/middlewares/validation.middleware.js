import { createError } from "../utils/custom.error.js";

const validation = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
       const err = createError(400, error.details[0].message);
       return next(err)
    }
    next();
}

export default validation