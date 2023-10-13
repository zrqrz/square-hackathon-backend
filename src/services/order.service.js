const { Order } = require('../models');

const saveOrder = async (orders) => {
    console.log(orders);
    for (let i = 0; i < orders.length; i++) {
        const newOrder = new Order({
            squareId: orders[i].order.id,
            name: orders[i].order.lineItems[0].name,
            quantity: orders[i].order.lineItems[0].quantity,
            amount: orders[i].order.lineItems[0].basePriceMoney.amount,
            currency: "CAD",
            totalMoney: orders[i].order.totalMoney.amount,
            customerId: orders[i].order.customerId,
            createdAt: orders[i].order.createdAt
        });

        const savedOrder = await newOrder.save();
        // console.log(savedOrder);
    }
}; 

const getSalesReport = async () => {
    const orders = await Order.find();
    const salesReport = new Array(12);
    for (let i = 0; i < 12; i++) {
        salesReport[i] = {
            totalRevenue: 0,
            totalOrders: 0,
            totalQuantity: 0,
            salesReportbyDay: new Array(31),
        };
        for (let j = 0; j < 31; j++) {
            salesReport[i].salesReportbyDay[j] = {
                totalRevenue: 0,
                totalQuantity: 0,
                salesReportbyHour: new Array(24),
            }
            for (let k = 0; k < 24; k++) {
                salesReport[i].salesReportbyDay[j].salesReportbyHour[k] = {
                    totalQuantity: 0,
                }
            }
        }
    }

    for (let order of orders) {
        const {year, month, day, hour}  = parseDate(order.createdAt);
        const totalMoney = parseInt(order.totalMoney, 10);
        const totalQuantity = parseInt(order.quantity, 10);

        salesReport[month - 1].totalRevenue += totalMoney;
        salesReport[month - 1].totalOrders += 1;
        salesReport[month - 1].totalQuantity += totalQuantity;
        salesReport[month - 1].salesReportbyDay[day - 1].totalRevenue += totalMoney;
        salesReport[month - 1].salesReportbyDay[day - 1].totalQuantity += totalQuantity;
        salesReport[month - 1].salesReportbyDay[day - 1].salesReportbyHour[hour].totalQuantity += totalQuantity;
    }

    return salesReport;

    // console.log(salesReport);
    // console.log(salesReport[9]);
    // for (let i = 0; i < 24; i++) {
    //     console.log(salesReport[9].salesReportbyDay[0].salesReportbyHour[i]);
    // }
    
    // for (let order of orders) {
    //     const {year, month, day, hour}  = parseDate(order.createdAt);
    //     const totalMoney = parseInt(order.totalMoney, 10);
    //     const totalQuantity = parseInt(order.quantity, 10);
        
    //     if (salesReport[month]) {
    //         salesReport[month].totalRevenue += totalMoney;
    //         salesReport[month].totalOrders += 1;
    //         salesReport[month].totalQuantity += totalQuantity;
    //         if (salesReport[month].salesReportbyDay[day]) {
    //             salesReport[month].salesReportbyDay[day].totalRevenue += totalMoney;
    //             salesReport[month].salesReportbyDay[day].totalQuantity += totalQuantity;
    //             if (salesReport[month].salesReportbyDay[day].salesReportbyHour[hour]) {
    //                 salesReport[month].salesReportbyDay[day].salesReportbyHour[hour].totalQuantity += totalQuantity;
    //             }else {
    //                 salesReport[month].salesReportbyDay[day].salesReportbyHour = [];
    //                 salesReport[month].salesReportbyDay[day].salesReportbyHour[hour] = {};
    //                 salesReport[month].salesReportbyDay[day].salesReportbyHour[hour].totalQuantity = totalQuantity;
    //             }
    //         }else {
    //             // salesReport[month].salesReportbyDay = [];
    //             salesReport[month].salesReportbyDay[day] = {};
    //             salesReport[month].salesReportbyDay[day].totalRevenue = totalMoney;
    //             salesReport[month].salesReportbyDay[day].totalQuantity = totalQuantity;
    //             salesReport[month].salesReportbyDay[day].salesReportbyHour = [];
    //             salesReport[month].salesReportbyDay[day].salesReportbyHour[hour] = {};
    //             salesReport[month].salesReportbyDay[day].salesReportbyHour[hour].totalQuantity = totalQuantity;
    //         }
    //     }else {
    //         salesReport[month] = {};
    //         salesReport[month].totalRevenue = totalMoney;
    //         salesReport[month].totalOrders = 1;
    //         salesReport[month].totalQuantity = totalQuantity;
    //         salesReport[month].salesReportbyDay = [];
    //         salesReport[month].salesReportbyDay[day] = {};
    //         salesReport[month].salesReportbyDay[day].totalRevenue = totalMoney;
    //         salesReport[month].salesReportbyDay[day].totalQuantity = totalQuantity;
    //         salesReport[month].salesReportbyDay[day].salesReportbyHour = [];
    //         salesReport[month].salesReportbyDay[day].salesReportbyHour[hour] = {};
    //         salesReport[month].salesReportbyDay[day].salesReportbyHour[hour].totalQuantity = totalQuantity;
    //     }
    // }
    // console.log(salesReport[10].salesReportbyDay);
    // console.log(parseDate('2023-10-13T9:52:30.999Z'));
    // console.log(parseDate('2023-10-08T010:41:10.023Z'));
    // console.log(parseDate('2023-10-15T09:574:00.538Z'));
}

const parseDate = (timestamp) => {
    const date = new Date(timestamp);
    return {
        year: date.getUTCFullYear(), 
        month: date.getUTCMonth() + 1, 
        day: date.getUTCDate(),
        hour: date.getUTCHours(),
    };
}

module.exports = {
    saveOrder,
    getSalesReport,
}