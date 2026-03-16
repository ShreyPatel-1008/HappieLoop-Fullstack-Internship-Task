const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST /api/cart - Add product to cart
router.post('/cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: 'userId and productId are required' });
    }

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += (quantity || 1);
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId,
        productId,
        quantity: quantity || 1
      });
    }

    res.status(201).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/cart/:id - Remove product from cart
router.delete('/cart/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
