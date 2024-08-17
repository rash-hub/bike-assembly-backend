"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    "bike_assembly",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      bike_id: {
        type: "int",
        foreignKey: {
          name: "bike_bike_assembly_fk",
          table: "bike",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: "id",
        },
      },
      employee_id: {
        type: "int",
        foreignKey: {
          name: "employee_bike_assembly_fk",
          table: "employee",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: "id",
        },
      },
      time_taken: "string",
      created: "datetime",
    },
    (err) => {
      if (err) return callback(err);
      return callback();
    }
  );
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
