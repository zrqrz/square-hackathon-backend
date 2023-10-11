const fs = require('fs');
const { Client, Environment, ApiError } = require("square");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

async function generateCustomers(customers) {
  //firstName, lastName, idemKey, emailAddress, phone
  const customerIds = [];
  customerIds.length = customers.length;

  for (let i = 0; i < customers.length; i++) {
    const firstName = customers[i].firstName;
    const lastName = customers[i].lastName;
    const idemKey = customers[i].key;
    const email = customers[i].email;
    const phone = customers[i].phone;

    try {
      const response = await client.customersApi.createCustomer({
        idempotencyKey: idemKey,
        givenName: firstName,
        familyName: lastName,
        companyName: 'Test',
        emailAddress: email,
        phoneNumber: phone
      });
      console.log(response.result);
      const customerId = response.result.customer.id;
      customerIds[i] = customerId;
    } catch (error) {
      console.log(error);
    }
  }
  return customerIds;
}

async function generateOrders(orderArray) {
  const orders = [];
  orders.length = orderArray.length;

  for (let i = 0; i < orderArray.length; i++) {
    try {
      const response = await client.ordersApi.createOrder({
        order: {
          locationId: 'L6G7P8Q4RG4D3',
          customerId: orderArray[i].id,
          lineItems: [
            {
              name: orderArray[i].item.name,
              quantity: orderArray[i].item.quantity,
              basePriceMoney: {
                amount: orderArray[i].item.amount,
                currency: 'CAD'
              }
            }
          ],
          state: 'OPEN',
          ticketName: 'Coffee Shop Order'
        },
        idempotencyKey: orderArray[i].key
      });
      // console.log(response.result);
      orders[i] = response.result;
    } catch (error) {
      console.log(error);
    }
  }
  return orders;
}

module.exports = {
  generateCustomers,
  generateOrders
}