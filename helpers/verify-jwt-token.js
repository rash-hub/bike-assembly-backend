const config = require(`../config/env/${process.env.NODE_ENV.trim()}`);
const jwt = require("jsonwebtoken");

exports.verifyJwtToken = (token) => {
  jwt.verify(token, config["refreshToken"].secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }
    return decoded;
  });
};
