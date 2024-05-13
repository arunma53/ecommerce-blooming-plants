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

// the `up` function contains the changes that we want to make to the database
exports.up = function(db) {
  return db.createTable('products',{
    id: { 
      'type': 'int',
      'primaryKey':true,
      'autoIncrement':true,
      'unsigned': true},
    name: { 
      'type': 'string', 
      'length':100, 
      'notNull':true
    },

    cost: {
      'type': 'decimal', // Assuming you want to store prices as decimals for accuracy
     'length': '10,2', // 10 digits with 2 decimal places
      'notNull': true
   },

    description:{
    'type':'text',
    'notNull':true
  },
    location: {
   'type': 'string',
    'length': 100,
    'notNull': true
  }

})
};


// the `down ` function prevents change done to the database

exports.down = function(db) {
  return db.dropTable('products');
};


exports._meta = {
  "version": 1
};
