const jwt = require("jsonwebtoken");
const config = require(`../config/env/${process.env.NODE_ENV.trim()}`);

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Token is required" });
  }
  jwt.verify(
    token,
    config[req.url?.includes("refresh-token") ? "refreshToken" : "authToken"]
      .secretKey,
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized!" });
      }
      req.user = decoded;
      next();
    }
  );
};

module.exports = verifyToken;
