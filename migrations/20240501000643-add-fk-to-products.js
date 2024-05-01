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
  //first parameter: the table which the fk is supposed to be in
  //second parameter : the table which the fk is referencing to
  //third paramter : object. the key is the fk and the vakue is what it is supposed to point to

  return db.addForeignKey('products','categories',{
    'category_id':'id'
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
