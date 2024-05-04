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
  //when creating a pivot table, and we are using bookshelf orm 
  //there is a special requirement for the table name (so that 
//in the model will work)
//table name must be a 
//1.a combination of the two tables in plural form
//2. arranged in alphabetical order
//3. separated by an underscore

  return db.createTable('products_tags',{
    'id':{ 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      unsigned: true
     },
    product_id: {
        type: 'int',
        notNull: true,
        unsigned: true,
        foreignKey: {
            name: 'products_tags_product_fk',
            table: 'products',
            rules: {
                onDelete: 'CASCADE',
                onUpdate: 'RESTRICT'
            },
            mapping: 'id'
        }
    },
    tag_id: {
      type: 'int',
      notNull: true,
      unsigned:true,
      foreignKey: {
          name: 'products_tags_tag_fk',
          table: 'tags',
          rules: {
              onDelete: 'CASCADE',
              onUpdate: 'RESTRICT'
          },
          mapping: 'id'
      }
  }
});
};


exports.down = async function(db) {
  // remove th eforeign key first before dropping the table
  await db.removeForeignKey('products_tags','products_tags_product_fk') ;
  await db.removeForeignKey('product_tags','products_tags_tag_fk')
  await db.dropTable('products_tags');

};

exports._meta = {
  "version": 1
};
