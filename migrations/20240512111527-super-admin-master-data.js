"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */

const moment = require("moment");
const { ADMIN } = require("../constants");
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.insert(
    "admin_user",
    {
      title: ADMIN,
      first_name: "Admin",
      last_name: "User",
      email: "admin@gmail.com",
      password: "$2a$12$KXmjuVO91qJ2fR4FIFQYROeWj5Km3iWFm3ie3uGKzHzGTXsEnKqSy",
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
