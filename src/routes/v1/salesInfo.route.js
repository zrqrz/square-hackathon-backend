const express = require("express");

const salesInfoController = require('../../controllers/salesInfo.controller');

const router = express.Router();

router.route('/sales_report_monthly/:month').get(salesInfoController.getSalesReportbyMonth);

router.route('/inventories').get(salesInfoController.getInventories);

router.route('/products/top_5').get(salesInfoController.getTop5Products);

router.route('/campaign_idea/:month').get(salesInfoController.getCompaignIdeas);

router.route('/pricing_strategy/:month').get(salesInfoController.getPricingStrategy);

// router.route('/social_media_plan/:month').get(salesInfoController.getSocialMediaPlan);

router.route('/hiringSuggestion/:month').get(salesInfoController.getHiringSuggestion);

module.exports = router;