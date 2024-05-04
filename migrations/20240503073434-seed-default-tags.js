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

exports.up = async function(db) {
  await db.insert('tags',['name'],['Sunlight Requirement']);
  await db.insert('tags',['name'],['Low Maintenance']);
  await db.insert('tags',['name'],['Lucky Plant']);
  await db.insert('tags',['name'],['Medicinal Plant']);
  await db.insert('tags',['name'],['Sacred Plant']);
  await db.insert('tags',['name'],['Balcony Garden']);
  await db.insert('tags',['name'],['Fragrant']); 
  await db.insert('tags',['name'],['Evergreen']);
  await db.insert('tags',['name'],['Winter Hardy']);
};

exports.down = function(db) {
  return db.runSql("DELETE FROM tags");
};

exports._meta = {
  "version": 1
};
