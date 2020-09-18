/**
 * @prettier
 */

const { flattenEdges } = require('@packdigital/ripperoni-utilities');

const client = require('./client');
const queries = require('./queries');
const Token = require('./token');

const getCustomer = async (inputs) => {
  const { email, password } = inputs;
  const accessToken =
    inputs.accessToken || (await Token.get({ email, password }));
  const query = queries.customer.get;
  const variables = { customerAccessToken: accessToken.token };
  const {
    data: { customer },
  } = await client.query({ query, variables });

  if (!customer) {
    throw [{ code: 'UNIDENTIFIED_CUSTOMER' }];
  }

  const addresses = flattenEdges(customer.addresses);
  const orders = flattenEdges(customer.orders).map((order) => ({
    ...order,
    discounts: flattenEdges(order.discounts),
    lineItems: flattenEdges(order.lineItems),
  }));

  return {
    accessToken,
    customer: {
      ...customer,
      addresses,
      orders,
    },
  };
};

const createCustomer = async ({
  email,
  password,
  firstName = '',
  lastName = '',
}) => {
  const mutation = queries.customer.create;
  const variables = { input: { email, password, firstName, lastName } };
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.customerCreate.errors || [];

  if (errors.length) {
    throw errors;
  }

  return await getCustomer({ email, password });
};

const attemptLoginOrCreateAccount = async (body) => {
  try {
    return await getCustomer(body);
  } catch {
    // TAKEN === incorrect password
    // TOO_MANY_CREATE_ATTEMPTS could be incorrect password
    return await createCustomer(body);
  }
};

module.exports = {
  get: getCustomer,
  create: createCustomer,
  loginOrCreate: attemptLoginOrCreateAccount,
};
