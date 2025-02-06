import jwt from "jsonwebtoken";
import Config from '../Configuration/Config.js';

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), Config.secretOrKey);
        req.user = decoded; // Attach user data to request
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};


