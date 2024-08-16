const config = require(`../config/env/${process.env.NODE_ENV.trim()}`);
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.getToken = (type, data) => {
  let token = jwt.sign(
    {
      data,
    },
    config[type].secretKey,
    { expiresIn: config[type].life }
  );
  return {
    token,
    exp: moment().add(config[type].life, "seconds").format(),
  };
};
