//all default starting file of
// a nodejs module is `index.js

//knex is necessart for bookshelf to work
const knex = require('knex')({
    //client refers to what database technology is used
    client:'mysql',
    connection:{
        user:'blooming',
        password:"plants1303",
        database:'plants',
        host:'127.0.0.1'
    }
});


//create bookshelf
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

