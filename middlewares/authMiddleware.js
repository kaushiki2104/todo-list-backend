const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    // 2. Extract token 
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // 3. Verify token
    JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

    
      req.user = decoded;

      
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Auth middleware error",
      error: error.message,
    });
  }
};
