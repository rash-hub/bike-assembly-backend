const { Op } = require("sequelize");
const BikeAssembly = require("../../models/BikeAssembly");
const Bike = require("../../models/Bike");
const Employee = require("../../models/Employee");

exports.create = async (req, res) => {
  try {
    await BikeAssembly.create({ ...req.body, employeeId: req.user.data.id });
    res.status(200).json({
      success: true,
      message: "Bike Assembly created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.fetch = async (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const searchValue = req.query.searchValue || "";
    const offset = (Number(page) - 1) * limit;
    const whereClause =
      req.user.data.title === "EMPLOYEE"
        ? {
            employeeId: req.user.data.id,
            ...(searchValue && {
              [Op.or]: [
                { "$bike.name$": { [Op.like]: `%${searchValue}%` } },
                {
                  "$employee.first_name$": { [Op.like]: `%${searchValue}%` },
                },
                { "$employee.last_name$": { [Op.like]: `%${searchValue}%` } },
              ],
            }),
          }
        : {
            ...(searchValue && {
              [Op.or]: [
                { "$bike.name$": { [Op.like]: `%${searchValue}%` } },
                {
                  "$employee.first_name$": { [Op.like]: `%${searchValue}%` },
                },
                { "$employee.last_name$": { [Op.like]: `%${searchValue}%` } },
              ],
            }),
          };
    const { count, rows: bikeAssembly } = await BikeAssembly.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      include: [
        {
          model: Bike,
          as: "bike",
        },
        {
          model: Employee,
          as: "employee",
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Bike Assembly fetched successfully",
      data: {
        bikeAssembly,
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

exports.update = async (req, res) => {
  try {
    await BikeAssembly.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      success: true,
      message: "Bike Assembly updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.delete = async (req, res) => {
  try {
    await BikeAssembly.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      success: true,
      message: "Bike Assembly deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.fetchAll = async (req, res) => {
  try {
    const bikeAssembly = await BikeAssembly.findAll();
    res.status(200).json({
      success: true,
      message: "Bike Assembly fetched successfully",
      data: bikeAssembly,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};
