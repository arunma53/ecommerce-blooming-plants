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
   tableName:'products'
})

module.exports = {Product}