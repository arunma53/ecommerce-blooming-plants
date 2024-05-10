const cartDataLayer = require('../dal/cart_items')

async function addToCart(userId, productId, quantity) {

    const cartItem = await cartDataLayer.getCartItemByUserAndProduct(userId,productId)
    if(cartItem){
        // update the quantity by 1
        await cartDataLayer.updateQuantity(userId,productId, cartItem.get('quantity')+1)
    }else{
        await cartDataLayer.createCartItem(userId,productId,quantity);
    }
    
    return true;
}

async function getCart(userId){
   const cartItems = await cartDataLayer.getCart(userId);

   //example of business logic :write the logic to get recommondationbased on the content of the shopping cart
    return cartItems;
}

module.exports = { addToCart ,getCart};

