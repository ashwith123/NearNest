const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login first"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

exports.requireAuth = requireAuth;