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

module.exports = {
    saveOrder
}