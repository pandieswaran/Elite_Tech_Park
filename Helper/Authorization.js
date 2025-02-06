export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.Role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};