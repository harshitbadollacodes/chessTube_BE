const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verifyToken (req, res, next) {
    const secret = process.env.JWT_SECRET;
    try {
        const token = req.headers.authorization;

        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Auth failed" });
    }
};

module.exports = { verifyToken };