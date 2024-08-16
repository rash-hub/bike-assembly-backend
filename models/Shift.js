const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Shift = sequelize.define(
  "Shift",
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
    tableName: "shift",
    timestamps: false,
  }
);

module.exports = Shift;
