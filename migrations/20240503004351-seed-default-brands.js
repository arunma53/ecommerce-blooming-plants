'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  //first parameter : the name of the table to insert
  //second parameter: array of column to insert into
  //third parameter : the values
  return db.insert("brands", ['name'], ['Default']);
};

exports.down = function(db) {
  return db.runSql("DELETE FROM products");
};

exports._meta = {
  "version": 1
};
