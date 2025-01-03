import jwt from "jsonwebtoken";

// Ensure consistent SECRET_KEY retrieval
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.log("Token missing in request cookies");
            return res.status(401).json({
                message: "User not authenticated. Token is missing.",
                success: false,
            });
        }

        console.log("Token found:", token);

        const decoded = jwt.verify(token, SECRET_KEY);

        if (!decoded || !decoded.userId) {
            console.log("Invalid or expired token:", token);
            return res.status(401).json({
                message: "Invalid or expired token.",
                success: false,
            });
        }

        req.id = decoded.userId;
        console.log("User authenticated with ID:", req.id);

        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(500).json({
            message: "Internal server error during authentication.",
            error: error.message,
            success: false,
        });
    }
};

export default isAuthenticated;
