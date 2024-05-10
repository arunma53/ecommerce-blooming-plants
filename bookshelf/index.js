//all default starting file of
// a nodejs module is `index.js

//knex is necessart for bookshelf to work
const knex = require('knex')({
    //client refers to what database technology is used
    client:process.env.DB_DRIVER,
    connection:{
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
        host:process.env.DB_HOST
    }
});


//create bookshelf
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

