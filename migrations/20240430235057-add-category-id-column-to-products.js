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
  // add new  colum to an existing table
  //addColumn has three paramters
  //1st parameter:name of the table
  //2nd parameter: name of the  new column
  // 3rd parameter: an object that defines the properties of the column
  return db.addColumn('products','category_id',{
    type:'int',
    unsigned:true,
    notNull:true

  })
  
};

exports.down = function(db) {
  return db.removeColumn('products','category_id');
};

exports._meta = {
  "version": 1
};
