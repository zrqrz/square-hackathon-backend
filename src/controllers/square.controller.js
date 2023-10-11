const httpStatus = require('http-status');
const { squareService, orderService } = require ('../services');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');

const createCustomerIds = catchAsync(async (req, res) => {
    const ids = await squareService.generateCustomers(req.body);
    res.send(ids);
});

const createOrders = catchAsync(async (req, res) => {
    const orders = await squareService.generateOrders(req.body);
    const newOrders = await orderService.saveOrder(orders);
    res.send(httpStatus[200]);
})

module.exports = {
    createCustomerIds,
    createOrders
}