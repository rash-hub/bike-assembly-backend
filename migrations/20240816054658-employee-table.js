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
    "employee",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      title: "string",
      first_name: "string",
      last_name: "string",
      email: "string",
      password: "string",
      phone: "string",
      deleted: "boolean",
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
