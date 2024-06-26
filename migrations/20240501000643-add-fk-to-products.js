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
  //fourth parameter: the name of the foreign key
  //fifth parameter:FK rules
  return db.addForeignKey('products','categories','product_category_fk',{
    'category_id':'id'
  },{
    onDelete:"CASCADE", // onDelete : what to do if a category is deleted
    onUpdate:"RESTRICT" //
  });
};

exports.down = function(db) {
  // agrument 1 : table to remove from
  //argument 2 ; the name of the foreign key
  return db.removeForeignKey('products','product_category_fk');
};

exports._meta = {
  "version": 1
};
