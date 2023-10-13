const httpStatus = require('http-status');
const logger = require('../config/logger');
const catchAsync = require('../utils/catchAsync');
const {vertexService, orderService} = require('../services');

const getSalesReportbyMonth = catchAsync(async (req, res) => {
    const month = req.params.month;
    const salesReport = await orderService.getSalesReport();
    res.status(httpStatus.OK).send(salesReport[month - 1]);
})

const getInventories = catchAsync(async (req, res) => {
    
})

const getTop5Products = catchAsync(async (req, res) => {
    
})

const getCompaignIdeas = catchAsync(async (req, res) => {
    orderService.getSalesReport();
    console.log(" im here");
    const contentText = "We sell 200 cups of coffee every day in summer. Think about coffee shop inventory plan";
    const response = await vertexService.sendRequest(contentText);
    res.status(httpStatus.OK).send(response);
})

const getPricingStrategy = catchAsync(async (req, res) => {
    
})

const getHiringSuggestion = catchAsync(async (req, res) => {
    
})

module.exports = {
    getSalesReportbyMonth,
    getInventories,
    getTop5Products,
    getCompaignIdeas,
    getPricingStrategy,
    getHiringSuggestion,
}