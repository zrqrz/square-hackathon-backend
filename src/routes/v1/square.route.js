const express = require('express');
const squareController = require('../../controllers/square.controller');

const router = express.Router();

router.route('/customers').post(squareController.createCustomerIds);

router.route('/orders').post(squareController.createOrders);

module.exports = router;