const Address = require('./src/address');
const Customer = require('./src/customer');
const Password = require('./src/password');
const Token = require('./src/token');


module.exports = {
  Address,
  Customer,
  Password,
  Token,
  address: Address,
  customer: Customer,
  password: Password,
  token: Token,
};
