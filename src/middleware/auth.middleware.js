const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized: Không tìm thấy Token" });
        }
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ 
                    message: "Forbidden: Token không hợp lệ hoặc đã hết hạn!",
                    error: err.message 
                });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("[AuthMiddleware Error]:", error);
        return res.status(500).json({
            message: "Internal Server Error: Lỗi xác thực hệ thống",
            error: error.message,
        });
    }
}

const verifyAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Bạn không có quyền truy cập" });
        }
        next();
    } catch (error) {
        console.error("[VerifyAdmin Error]:", error);
        return res.status(500).json({
            message: "Internal Server Error: Lỗi xác thực hệ thống",
            error: error.message,
        });
    }
}

module.exports = { authMiddleware, verifyAdmin }; 
