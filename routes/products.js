const express = require("express");
const router = express.Router(); // #1 - Create a new express Router

//require in the model
const { Product, Category, Tag } = require('../models');
const { createProductForm, bootstrapField, createSearchForm } = require('../forms');
const dataLayer = require('../dal/products')
const { object } = require("forms/lib/fields");
const { route } = require("express/lib/application");


/// a router object can contain routes
router.get('/', async function (req, res) {

   const allCategories = await dataLayer.getAllCategories();
   allCategories.unshift([0,'All Category']);
   
   const allTags = await dataLayer.getAllTags();

   const searchForm = createSearchForm(allCategories,allTags);
   searchForm.handle(req, {
      'success': async function (form) {
         //1. create an empty query
         //below is same as SELECT * FROM products
         const queryBuilder = Product.collection(); // create a new query bulider

        if(form.data.name){
         //then append the search for name where clause to the query builder
         //eqv. where name like '%${form.data.name}%'
          queryBuilder.where('name','like',"%" + form.data.name +"%");
        }

        if(form.data.min_cost){
         queryBuilder.where('cost','>=',form.data.min_cost);
        }
        
        if(form.data.max_cost){
         queryBuilder.where('cost','<=',form.data.max_cost);
        }

        if(form.data.category_id && form.data.category_id != "0"){
         queryBuilder.where('category_id',"=",form.data.category_id);
        }

       if(form.data.tags){
        queryBuilder.query('join','products_tags','products.id','products_id')
        .where('tag_id','in',form.data.tags.split(','));
       }
         //when we call fetch onn the queryBuilder,then the command
         //is sent to the SQL database
         const products = await queryBuilder.fetch({
            withRelated:['category','tags']
         });
         res.render('products/index', {
            products: products.toJSON(),
            searchForm: form.toHTML(bootstrapField)
         });
      },
      'empty': async function (form) {

         // if the user submits an empty serach form, the just fetch 
         //all the products

         // use the product model to get all products
         const products = await dataLayer.getAllProducts();

         //products.tojSON() convert the table rows  into JSON format
         res.render('products/index', {
            products: products.toJSON(),
            searchForm: searchForm.toHTML(bootstrapField)
         });

      }, 'error': async function (form) {
         //if the user's search form has error, lets just send back the form
         res.render('products/index', {
            products: [],
            searchForm: form.toHTML(bootstrapField)
         });
      }
   })

   // use the product model to get all products
   // const products = await Product.collection().fetch({
   //    withRelated: ['category', 'tags']
   // });
   // //products.tojSON() convert the table rows  into JSON format
   // res.render('products/index', {
   //    products: products.toJSON(),
   //    searchForm: searchForm.toHTML(bootstrapField)
   // });
});

router.get('/add-products', async function (req, res) {
   //get all the categories

   const allCategories = await Category.fetchAll().map(category => [category.get('id'), category.get('name')]);

   //get all the tags
   const allTags = await Tag.fetchAll().map(t=> [t.get('id'), t.get('name')]);


   const productForm = createProductForm(allCategories, allTags);
   res.render('products/create', {
      form: productForm.toHTML(bootstrapField),
      cloudinaryName: process.env.CLOUDINARY_NAME,
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
      cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
   })
});
router.post('/add-products', async function (req, res) {

   //get all the categories

   const allCategories = await Category.fetchAll().map(category => [category.get('id'), category.get('name')]);

   //get all the tags
   const allTags = await Tag.fetchAll().map(t => [t.get('id'), t.get('name')]);


   // create the product form object using caolan forms
   const productForm = createProductForm(allCategories, allTags);
   //using the form object to handle the request
   productForm.handle(req, {
      'success': async function (form) {
         // the forms have no error
         // to access each feild in the submitted form
         //we use form.data.<feildname>


         //craete an instance of the Product model
         //an instance of the product is one row in 
         const product = await dataLayer.createProduct(form.data);

         // a flash message can only be send  before a redirect
         //req.flash has two arguments:
         //1. the type of message to show
         //2. what message to show
         //3.req.flash will add a new flash message to the current session
         req.flash('success_messages', 'New product has been created successfully');
         res.redirect("/products/");

      },
      'empty': function (form) {
         // the user submitted an empty form
         res.render('products/create', {
            form: productForm.toHTML(bootstrapField)
         })
      },
      'error': function (form) {
         //the user submitted a form with error
         res.render('products/create', {
            form: form.toHTML(bootstrapField)
         })
      }
   })
})

router.get('/update-product/:productId', async function (req, res) {
   const productId = req.params.productId; 
   const product = await dataLayer.getProductById(productId); 
 
   //get all the categories

   const allCategories = await dataLayer.getAllCategories();

   //get all the tags
   const allTags = await dataLayer.getAllTags();


   //create the product form
   const productForm = createProductForm(allCategories, allTags);

   //prefill the forms with values from the product
   productForm.fields.name.value = product.get('name');
   productForm.fields.cost.value = product.get('cost');
   productForm.fields.description.value = product.get('description');
   productForm.fields.location.value = product.get('location');
   productForm.fields.category_id.value = product.get('category_id');

   //get the ids of all the tags that the product is related to 
   const selectedTags = await product.related('tags').pluck('id');
   productForm.fields.tags.value = selectedTags;


   res.render('products/update', {
      'form': productForm.toHTML(bootstrapField),
      'product': product.toJSON(),
      cloudinaryName: process.env.CLOUDINARY_NAME,
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
      cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
   })


})

router.post('/update-product/:productId', async function (req, res) {
   //1.create the form object
   const productForm = createProductForm();

   //use the form object to handle the request
   productForm.handle(req, {
      'success': async function (form) {
         //find the product that the user want to modify
         const product = await Product.where({
            'id': req.params.productId
         }).fetch({
            withRelated: ['tags'],
            require: true // make sure the product actually exixts

         });

         //product.set('name',form.data.name)
         //product.set('cost',form.data.cost)
         //product.set('description',form.data.description)
         //product.set('location',form.data.location)
         const { tags, ...productData } = form.data;
         await dataLayer.updateProduct(product,productData);

         //update the relationships
         //1.coert the tags from  string to array
         const tagIds = tags.split(',');

         //2. remove alll the tags
         // ..get an array of the ids of the tags related tothe product
         const existingTagIds = await product.related('tags').pluck('id')
         await product.tags().detach(existingTagIds);//detach is to remove a M:N relationship

         await product.tags().attach(tagIds);


         res.redirect('/products/')
      },
      'empty': function (form) {
         res.render('products/update', {
            form: form.toHTML(bootstrapField)
         })
      },
      'error': function (form) {
         res.render('products/update', {
            form: form.toHTML(bootstrapField)
         })
      }
   })
})
router.get('/delete-product/:productId', async function (req, res) {
   const product = await Product.where({
      'id': req.params.productId
   }).fetch({
      required: true
   });
   res.render('products/delete', {
      product: product.toJSON()
   })
})

router.post('/delete-product/:productId', async function (req, res) {
   //get the product we want to delete
   const product = await Product.where({
      'id': req.params.productId
   }).fetch({
      required: true
   });


   req.flash('error_messages', `${product.get('name')} has been deleted`);
   await product.destroy();
   res.redirect('/products');


})


//exports
module.exports = router; 