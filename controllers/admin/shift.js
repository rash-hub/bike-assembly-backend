const Shift = require("../../models/Shift");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  try {
    await Shift.create(req.body);
    res.status(200).json({
      success: true,
      message: "Shift created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.fetch = async (req, res) => {
  try {
    if (!(req.query.page || req.query.limit || req.query.searchValue)) {
      const shifts = await Shift.findAll({
        where: { deleted: false },
      });
      return res.status(200).json({
        success: true,
        message: "Shifts fetched successfully",
        data: shifts,
      });
    } else {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const searchValue = req.query.searchValue || "";
      const offset = (Number(page) - 1) * limit;
      const whereClause = {
        deleted: false,
        ...(searchValue && {
          [Op.or]: [{ name: { [Op.like]: `%${searchValue}%` } }],
        }),
      };
      const { count, rows: shifts } = await Shift.findAndCountAll({
        where: whereClause,
        offset,
        limit,
      });
      return res.status(200).json({
        success: true,
        message: "Shifts fetched successfully",
        data: {
          shifts,
          pagination: {
            totalItems: count,
            currentPage: parseInt(page),
            itemsPerPage: parseInt(limit),
          },
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.update = async (req, res) => {
  try {
    await Shift.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      success: true,
      message: "Shift updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.delete = async (req, res) => {
  try {
    await Shift.update(
      { deleted: true },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json({
      success: true,
      message: "Shift deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.fetchAll = async (req, res) => {
  try {
    const shifts = await Shift.findAll({
      where: { deleted: false },
    });
    res.status(200).json({
      success: true,
      message: "Shifts fetched successfully",
      data: shifts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};
