"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */

const moment = require("moment");
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.insert(
    "admin_user",
    {
      first_name: "Admin",
      last_name: "User",
      email: "admin@gmail.com",
      password: "$2a$10$vCwyahw2KkJcNnVyx1G7ueicu6D3m1P9JgV2AbY9RVqYEmRuMTnPu",
      phone: "9999999999",
      deleted: false,
      created: moment().format("YYYY-MM-DD HH:mm:ss"),
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
