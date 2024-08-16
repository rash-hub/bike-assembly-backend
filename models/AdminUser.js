const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const moment = require("moment");

const AdminUser = sequelize.define(
  "AdminUser",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email",
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "phone",
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "deleted",
      defaultValue: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created",
      defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
  },

  {
    tableName: "admin_user",
    timestamps: false,
  }
);

module.exports = AdminUser;
