const { SOMETHING_WENT_WRONG } = require("../../constants");
const { getToken } = require("../../helpers/get-jwt-token");
const AdminUser = require("../../models/AdminUser");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminUser = await AdminUser.findOne({ where: { email: email } });
    if (!adminUser) {
      return res.status(404).json({
        success: false,
        message: "No such user found",
      });
    }
    const match = await bcrypt.compare(password, adminUser.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Email or Password is incorrect",
      });
    }
    let authToken = await getToken("authToken", adminUser);
    let refreshToken = await getToken("refreshToken", adminUser.id);
    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
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
