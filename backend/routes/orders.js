const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

// POST /api/order - Place a new order
router.post('/order', async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingDetails } = req.body;

    if (!userId || !items || !items.length || !totalAmount || !shippingDetails) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.phone) {
      return res.status(400).json({ success: false, message: 'Complete shipping details are required (name, address, phone)' });
    }

    const order = await Order.create({
      orderId: 'ORD-' + uuidv4().slice(0, 8).toUpperCase(),
      userId,
      items,
      totalAmount,
      shippingDetails,
      status: 'Pending'
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:userId - Get order history for a user
router.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
