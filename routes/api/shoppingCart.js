const express = require('express');
const router = express.Router();

const cartServices = require('../services/cart_services');
const { checkIfAuthenticated } = require('../middlewares');

// Fetch cart items
router.get('/', [checkIfAuthenticated], async function (req, res) {
    try {
        const currentLoggedInUser = req.session.user.id;
        const cartItems = await cartServices.getCart(currentLoggedInUser);
        res.json({
            success: true,
            cartItems: cartItems.toJSON()
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cart items'
        });
    }
});

// Add product to cart
router.post('/:product_id/add', [checkIfAuthenticated], async function (req, res) {
    try {
        const productId = req.params.product_id;
        await cartServices.addToCart(req.session.user.id, productId, 1);
        res.json({
            success: true,
            message: 'Product added to the shopping cart'
        });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add product to cart'
        });
    }
});

// Remove product from cart
router.delete('/:product_id/remove', [checkIfAuthenticated], async function (req, res) {
    try {
        const productId = req.params.product_id;
        await cartServices.removeFromCart(req.session.user.id, productId);
        res.json({
            success: true,
            message: 'Product has been removed from the shopping cart'
        });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove product from cart'
        });
    }
});

// Update product quantity in cart
router.put("/:product_id/updateQuantity", [checkIfAuthenticated], async function (req, res) {
    try {
        const productId = req.params.product_id;
        const newQuantity = req.body.newQuantity;

        if (newQuantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }

        await cartServices.updateQuantity(req.session.user.id, productId, newQuantity);
        res.json({
            success: true,
            message: 'Quantity has been updated!'
        });
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update quantity'
        });
    }
});

module.exports = router;
