const { Sequelize } = require("sequelize");
const config = require("../database.json");

const sequelize = new Sequelize(
  config.development.database,
  config.development.user,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.driver,
    define: {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      primaryKey: "id",
      autoIncrement: true,
    },
    logging: false,
  }
);

module.exports = sequelize;
