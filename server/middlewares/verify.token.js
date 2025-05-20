// import jwt from "jsonwebtoken";

// export const verifyUser = (req, res, next) => {
//     try {
//         // Get token from headers
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer")) {
//             return res
//                 .status(401)
//                 .json({ success: false, message: "Access token missing" });
//         }

//         const token = authHeader.split(" ")[1];

//         // Verify access token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;

//         // Call next function token is valid
//         next();
//     } catch (error) {
//         next(error);
//     }
// };


import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Access token missing",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify access token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        // This block is now only for unexpected errors
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
