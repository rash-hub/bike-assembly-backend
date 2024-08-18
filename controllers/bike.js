const Bike = require("../models/Bike");
const BikeAssembly = require("../models/BikeAssembly");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  try {
    await Bike.create(req.body);
    res.status(200).json({
      success: true,
      message: "Bike created successfully",
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
      const bikes = await Bike.findAll({
        where: { deleted: false },
      });
      return res.status(200).json({
        success: true,
        message: "Bikes fetched successfully",
        data: bikes,
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
      const { count, rows: bikes } = await Bike.findAndCountAll({
        where: whereClause,
        offset,
        limit,
      });
      return res.status(200).json({
        success: true,
        message: "Bikes fetched successfully",
        data: {
          bikes,
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
    await Bike.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      success: true,
      message: "Bike updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};

exports.delete = async (req, res) => {
  try {
    await Bike.update(
      { deleted: true },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json({
      success: true,
      message: "Bike deleted successfully",
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
    const assembledBikeIds = bikeAssembly.map((bike) => bike.bikeId);
    const bikes = await Bike.findAll({
      where: {
        deleted: false,
        id: {
          [Op.notIn]: assembledBikeIds,
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Bikes fetched successfully",
      data: bikes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || SOMETHING_WENT_WRONG });
  }
};
