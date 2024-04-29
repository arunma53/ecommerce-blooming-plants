const express = require("express");
const router = express.Router(); // #1 - Create a new express Router

//require in the model
const { Product } = require('../models')


/// a router object can contain routes
router.get('/', async function(req,res){
   // use the product model to get all products
   const products = await Product.collection().fetch();
   //products.tojSON() convert the table rows  into JSON format
   res.render('products/index',{
    products:products.toJSON()
   });
});

 router.get('/add-products',function(req,res){
    res.send("Add product")
 })

 
//exports
module.exports = router; 