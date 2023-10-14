const httpStatus = require('http-status');
const logger = require('../config/logger');
const catchAsync = require('../utils/catchAsync');
const {vertexService, orderService} = require('../services');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getSalesReportbyMonth = catchAsync(async (req, res) => {
    const month = req.params.month;
    const salesReport = await orderService.getSalesReport();
    res.status(httpStatus.OK).send(salesReport[month - 1]);
})

const getInventories = catchAsync(async (req, res) => {
    const month = req.params.month;
    const salesReport = await orderService.getSalesReport();
    const salesAmountbyMonth = salesReport[month - 1].totalQuantity;
    const contentText = `We sell ${salesAmountbyMonth} cups of coffee this month. Think about the coffee shop inventory plan for next month. Please respond in the following json format: {greenCoffeeBeans: , roastedCoffeeBeans: , groundCoffee: , coffeeFilters: , wholeMilk: , 2%Milk: , paperTowel: , napkins: }. do not exceed 200 lbs`;
    const response = await vertexService.sendRequest(contentText);
    res.status(httpStatus.OK).send(response.predictions[0].content);
})

const getTop5Products = catchAsync(async (req, res) => {
    const month = req.params.month;
    const top5Products = await orderService.getMonthlyTop5(month);
    res.status(httpStatus.OK).send(JSON.stringify(top5Products));
})

const getCampaignIdeas = catchAsync(async (req, res) => {
    const month = months[req.params.month - 1];
    const contentText = `It's ${month}. Think about coffee shop five campaign ideas. Please respond in the following json format: {campaignTitle: , campaignContent: }`;
    const response = await vertexService.sendRequest(contentText);
    res.status(httpStatus.OK).send(response.predictions[0].content);
})

const getPricingStrategy = catchAsync(async (req, res) => {
    const price = 5;
    const contentText = `Our coffee price is average ${price} per cup. Please tell me the market price in Canada and compare the percentage higher or lower. Please respond in following json format: {marketPrice: , percentage:  }`;
    const response = await vertexService.sendRequest(contentText);
    res.status(httpStatus.OK).send(response.predictions[0].content);
})

const getSocialMediaPlan = catchAsync(async (req, res) => {
    const month = req.params.month;
    const top5Products = await orderService.getMonthlyTop5(month);
    const top1Coffee = top5Products[0][0];
    const contentText = `Our top 1 coffee is ${top1Coffee} in ${months[month - 1]}. Please create a social media plan including 5 exact ${months[month - 1]} dates. Dates should not be consecutive. please respond in following json format: {Date: 11/13, Plan: }. The plan should be in one line. Everything in one json file. Only ${months[month - 1]}`;
    const response = await vertexService.sendRequest(contentText);
    res.status(httpStatus.OK).send(response.predictions[0].content);
})

const getMarketingPercentage = catchAsync(async (req, res) => {
    const contentText = `Give coffee shop ideas about digital marketing promotion percentage. Please respond in following json format: {marketingMethod: , percentage: }`;
    const response = await vertexService.sendRequest(contentText);
    res.status(httpStatus.OK).send(response.predictions[0].content);
})

const getHiringSuggestion = catchAsync(async (req, res) => {
    const month = req.params.month;
    const salesReport = await orderService.getSalesReport();
    const salesAmountbyMonth = salesReport[month - 1].totalQuantity;
    const numEmployees = 2;
    const contentText = `we sell ${salesAmountbyMonth} cups of coffee this month and we have ${numEmployees} people. Do you think a coffee shop needs to hire more people? yes or no`;
    const response = await vertexService.sendRequest(contentText);
    res.status(httpStatus.OK).send(response.predictions[0].content);
})

module.exports = {
    getSalesReportbyMonth,
    getInventories,
    getTop5Products,
    getCampaignIdeas,
    getPricingStrategy,
    getHiringSuggestion,
    getSocialMediaPlan,
    getMarketingPercentage,
}