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
    "user",
    {
      id: {
        type: "string",
        length: 36,
        primaryKey: true,
        notNull: true,
      },
      first_name: {
        type: "string",
      },
      last_name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      role: {
        type: "string",
      },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable("user", callback);
};

exports._meta = {
  version: 1,
};
