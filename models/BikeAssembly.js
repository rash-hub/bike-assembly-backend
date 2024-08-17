const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const moment = require("moment");
const Bike = require("./Bike");
const Employee = require("./Employee");

const BikeAssembly = sequelize.define(
  "BikeAssembly",
  {
    bikeId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "bike_id",
      references: {
        model: "Bike",
        key: "id",
      },
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "employee_id",
      references: {
        model: "Employee",
        key: "id",
      },
    },
    timeTaken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "time_taken",
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created",
      defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
  },

  {
    tableName: "bike_assembly",
    timestamps: false,
  }
);

BikeAssembly.belongsTo(Bike, { foreignKey: "bikeId", as: "bike" });
BikeAssembly.belongsTo(Employee, { foreignKey: "employeeId", as: "employee" });

module.exports = BikeAssembly;
