const { SOMETHING_WENT_WRONG } = require("../../constants");
const { getToken } = require("../../helpers/get-jwt-token");
const { verifyJwtToken } = require("../../helpers/verify-jwt-token");
const AdminUser = require("../../models/AdminUser");
const bcrypt = require("bcrypt");
const Employee = require("../../models/Employee");

exports.login = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const user =
      isAdmin === "true" || isAdmin === true
        ? await AdminUser.findOne({ where: { email: email } })
        : await Employee.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No such user found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    let authToken = await getToken("authToken", user);
    let refreshToken = await getToken("refreshToken", user);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user,
        authToken,
        refreshToken,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { token } = req.body;
    let user = await verifyJwtToken(token);
    let authToken = await getToken("authToken", user);
    let refreshToken = await getToken("refreshToken", user);
    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        authToken,
        refreshToken,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};
