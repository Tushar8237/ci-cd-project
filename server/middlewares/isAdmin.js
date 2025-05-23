const checkRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized. No user data found." });
            }

            if (req.user.role !== requiredRole) {
                return res
                    .status(403)
                    .json({ message: `Forbidden. ${requiredRole} role required.` });
            }

            next(); // User has the require role
        } catch (error) {
            console.error("Role check error", error.message);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    };
};


export default checkRole;