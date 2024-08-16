const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bike = sequelize.define(
  "Bike",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
      unique: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "deleted",
      defaultValue: false,
    },
  },

  {
    tableName: "bike",
    timestamps: false,
  }
);

module.exports = Bike;
