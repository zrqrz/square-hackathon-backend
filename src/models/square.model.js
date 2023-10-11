const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    squareId: String,
    name: String,
    quantity: String,
    amount: String,
    currency: String,
    totalMoney: String,
    customerId: String,
    createdAt: String    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;