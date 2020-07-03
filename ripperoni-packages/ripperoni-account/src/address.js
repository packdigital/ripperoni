const client = require('./client');
const queries = require('./queries');
const Customer = require('./customer');


const _setDefaultAddress = async ({ accessToken, id }) => {
  const mutation = queries.address.default;
  const variables = { accessToken: accessToken.token, id };
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.default.errors || [];

  if (errors.length) {
    throw errors;
  }

  return await Customer.get({ accessToken });
};

const createAddress = async ({ accessToken, address, isDefault = false }) => {
  const mutation = queries.address.create;
  const variables = { accessToken: accessToken.token, address };
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.create.errors || [];

  if (errors.length) {
    throw errors;
  }

  const newAddress = response.data.create.address;

  return (isDefault)
    ? await _setDefaultAddress({ accessToken, id: newAddress.id })
    : await Customer.get({ accessToken });
};

const deleteAddress = async ({ accessToken, id }) => {
  const mutation = queries.address.delete;
  const variables = { accessToken: accessToken.token, id };
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.delete.errors || [];

  if (errors.length) {
    throw errors;
  }

  return await Customer.get({ accessToken });
};

const updateAddress = async ({ accessToken, address, id, isDefault = false }) => {
  const mutation = queries.address.update;
  const variables = { accessToken: accessToken.token, address, id };
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.update.errors || [];

  if (errors.length) {
    throw errors;
  }

  const newAddress = response.data.update.address;

  return (isDefault)
    ? await _setDefaultAddress({ accessToken, id: newAddress.id })
    : await Customer.get({ accessToken });

};

module.exports = {
  create: createAddress,
  delete: deleteAddress,
  update: updateAddress,
};
