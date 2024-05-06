const express = require("express");
const router = express.Router(); // #1 - Create a new express Router


// #2 Add a new route to the Express router
/// a router object can contain routes
router.get('/', (req,res)=>{
   console.log("landing")
    res.render('landing/index')
})

 router.get('/about-us',function(req,res){
    res.render("landing/about-us")
 })

 router.get('/contact-us',function(req,res){
    res.render("landing/contact-us")
 })


module.exports = router; 