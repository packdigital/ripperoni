const Customer = require('./customer');
const client = require('./client');
const queries = require('./queries');


const recoverPassword = async ({ email }) => {
  const mutation = queries.password.recover;
  const variables = { email };
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.recover.errors || [];

  if (errors.length) {
    throw errors;
  }

  return {};
};

const resetPassword = async ({ password, url }) => {
  const mutation = queries.password.reset;
  const variables = { password, resetUrl: url };
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.reset.errors || [];

  if (errors.length) {
    throw errors;
  }

  const accessToken = response.data.reset.accessToken;
  const customer = await Customer.get({ accessToken });

  return customer;
};

module.exports = {
  recover: recoverPassword,
  reset: resetPassword,
};
