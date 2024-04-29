const express = require("express");
const router = express.Router(); // #1 - Create a new express Router


/// a router object can contain routes
router.get('/', (req,res)=>{
    res.send("All products")
})

 router.get('/add-products',function(req,res){
    res.send("Add product")
 })

 
//exports
module.exports = router; 