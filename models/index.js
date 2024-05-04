//in the bookshelf  orm(and most ORM ), a model
// represent on Table in you databasae
//you issue coomands (in the js) on the model, and the model
//translate your commands to sql(or whatever DB you are using)

//when you requuire a file , and its a js file, you can omit the extention
//instead of const bookshelf = require('../bookshelf/index.js');
//=> const bookshelf  = require('../bookshelf/index)
//when you require a file in the folder and the file is index
//you can omit the 'index'(you can omit the filename)

const bookshelf = require('../bookshelf');

//create a product model
//one model represent one table in your database
//first argument is the name of your model
//second argument is a configure obj

const Product = bookshelf.model('Product',{
   tableName:'products',
   //relationship in Bookmodel are represented as functions
   // the name of the fk column should be the table name with _id at the back, singular
   //the name of fk should be Model name of the other party but in small and singular
   category:function(){
     return this.belongsTo('Category');//one product model instance belongs to one category
   },
   tags: function() {
      return this.belongsToMany('Tag');
  }

})


//and model name keep to singural form of the table name
//but the first alphabet case is uppercase
const Category = bookshelf.model('Category',{
   //table name should always be plural
   tableName:'categories',
   // the name of the relationship is plural form of the model name
   products:function(){
      return this.hasMany('Product');
   }
})

const Tag = bookshelf.model('Tag',{
   tableName:'tags',
   products(){
     return this.belongsToMany('Product');
   }

})

const User = bookshelf.model('User',{
   tableName:'users'
})

module.exports = { Product , Category,Tag,User }