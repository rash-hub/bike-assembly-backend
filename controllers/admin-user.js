const AdminUser = require("../models/AdminUser");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.fetch = async (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const searchValue = req.query.searchValue || "";
    const offset = (Number(page) - 1) * limit;
    const whereClause = {
      deleted: false,
      ...(searchValue && {
        [Op.or]: [
          { firstName: { [Op.like]: `%${searchValue}%` } },
          { lastName: { [Op.like]: `%${searchValue}%` } },
          { email: { [Op.like]: `%${searchValue}%` } },
          { phone: { [Op.like]: `%${searchValue}%` } },
          {
            [Op.and]: [
              { firstName: { [Op.like]: `%${searchValue.split(" ")[0]}%` } },
              {
                lastName: {
                  [Op.like]: `%${searchValue.split(" ")[1] || ""}%`,
                },
              },
            ],
          },
        ],
      }),
    };
    const { count, rows: adminUsers } = await AdminUser.findAndCountAll({
      where: whereClause,
      offset,
      limit,
    });
    return res.status(200).json({
      success: true,
      message: "Admin users fetched successfully",
      data: {
        adminUsers,
        pagination: {
          totalItems: count,
          currentPage: parseInt(page),
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.view = async (req, res) => {
  try {
    const adminUser = await AdminUser.findOne({
      where: { id: req.params.id, deleted: false },
    });
    res.status(200).json({
      success: true,
      message: "Admin user fetched successfully",
      data: adminUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.delete = async (req, res) => {
  try {
    await AdminUser.update(
      { deleted: true },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json({
      success: true,
      message: "Admin user deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.create = async (req, res) => {
  try {
    const adminUser = await AdminUser.findOne({
      where: { email: req.body.email, deleted: false },
    });
    if (adminUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await AdminUser.create(req.body);
    res.status(200).json({
      success: true,
      message: "Admin user created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.update = async (req, res) => {
  try {
    const adminUser = await AdminUser.findOne({
      where: {
        email: req.body.email,
        id: { [Op.ne]: req.params.id },
        deleted: false,
      },
    });
    if (adminUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }
    await AdminUser.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      success: true,
      message: "Admin user updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};
