const express = require("express");
const router = express.Router(); // #1 - Create a new express Router

//require in the model
const { Product } = require('../models');
const {createProductForm , bootstrapField} = require('../forms');


/// a router object can contain routes
router.get('/', async function(req,res){
   // use the product model to get all products
   const products = await Product.collection().fetch();
   //products.tojSON() convert the table rows  into JSON format
   res.render('products/index',{
    products:products.toJSON()
   });
});

 router.get('/add-product',function(req,res){
    const productForm = createProductForm();
    res.render('products/create',{
      form:productForm.toHTML(bootstrapField)
    })
 });
 router.post('/add-product', function(req,res){
   // create the product form object using caolan forms
   const productForm = createProductForm();
   //using the form object to handle the request
   productForm.handle(req,{
        'success': async function(form){
           // the forms have no error
           // to access each feild in the submitted form
           //we use form.data.<feildname>


           //craete an instance of the Product model
           //an instance of the product is one row in 
           const product = new Product();
           product.set('name',form.data.name)
           product.set('cost',form.data.cost)
           product.set('description',form.data.description)
           product.set('location',form.data.location)

           // save the prodcut to te databse
           await product.save();

           //same as
           res.redirect("/products/");

        },
        'empty': function(form){
         // the user submitted an empty form
         res.render('products/create',{
            form:productForm.toHTML(bootstrapField)
         })
        },
        'error': function(form){
         //the user submitted a form with error
         res.render('products/create',{
            form:form.toHTML(bootstrapField)
         })
        }
   })
 })

 router.get('/update-product/productId', async function(req,res){
   const productId = req.params.productId;

   //fetch the product that we want to update
   const product = await Product.where({
      'id':productId
   }).fetch({
      require:true
   });

   //create the product form
   const productForm = createProductForm();

//prefill the forms with values from the product
   productForm.fields.name.value = product.get('name');
   productForm.fields.cost.value = product.get('cost');
   productForm.fields.description.value = product.get('description');
   productForm.fields.location.value = product.get('location');

   res.render('products/update',{
      'form': productForm.toHTML(bootstrapField),
      'product':product.toJSON()
   })


 })
 
//exports
module.exports = router; 