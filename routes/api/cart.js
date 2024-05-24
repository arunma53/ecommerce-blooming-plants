// routes/api/cart.js

const express = require('express');
const router = express.Router();
const cartServices = require('../../services/cart_services');
const { checkIfAuthenticated } = require('../../middlewares');

router.get('/', [checkIfAuthenticated], async function (req, res) {
    const userId = req.session.user.id;
    const cartItems = await cartServices.getCart(userId);
    res.json(cartItems);
});

router.post('/:product_id/add', [checkIfAuthenticated], async function (req, res) {
    const userId = req.session.user.id;
    const productId = req.params.product_id;
    const quantity = req.body.quantity || 1;
    await cartServices.addToCart(userId, productId, quantity);
    res.json({ message: 'Product added to cart' });
});

router.delete('/:product_id/remove', [checkIfAuthenticated], async function (req, res) {
    const userId = req.session.user.id;
    const productId = req.params.product_id;
    await cartServices.removeFromCart(userId, productId);
    res.json({ message: 'Product removed from cart' });
});

router.put('/:product_id/updateQuantity', [checkIfAuthenticated], async function (req, res) {
    const userId = req.session.user.id;
    const productId = req.params.product_id;
    const newQuantity = req.body.newQuantity;
    await cartServices.updateQuantity(userId, productId, newQuantity);
    res.json({ message: 'Quantity updated' });
});

module.exports = router;
