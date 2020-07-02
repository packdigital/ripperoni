const { getLegacyShopifyId } = require('@packdigital/ripperoni-utilities');

const client = require('./client');
const queries = require('./queries');
const Customer = require('./customer');

const _setDefaultAddress = async ({ accessToken, id }) => {
  const mutation = queries.address.default;
  const variables = { accessToken: accessToken.token, id };
  const { customer } = await Customer.get({ accessToken });
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.default.errors || [];

  if (errors.length) {
    throw errors;
  }

  const defaultAddress = response.data.default.customer.defaultAddress;

  return {
    accessToken,
    customer: {
      ...customer,
      defaultAddress
    }
  };
};

const createAddress = async ({ accessToken, address, default = false }) => {
  console.log('default', default);
  const mutation = queries.address.create;
  const variables = { accessToken: accessToken.token, address };
  const { customer } = await Customer.get({ accessToken });
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.create.errors || [];

  if (errors.length) {
    throw errors;
  }

  const newAddresses = [ ...customer.addresses, response.data.create.address ];

  if (default) {
    return await _setDefaultAddress({ accessToken, id: response.data.create.address.id });
  }

  return {
    accessToken,
    customer: {
      ...customer,
      addresses: newAddresses
    }
  };
};

const deleteAddress = async ({ accessToken, id }) => {
  const mutation = queries.address.delete;
  const variables = { accessToken: accessToken.token, id };
  const { customer } = await Customer.get({ accessToken });
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.delete.errors || [];

  if (errors.length) {
    throw errors;
  }

  const deletedAddressId = getLegacyShopifyId(response.data.delete.id);
  const newAddresses = customer.addresses
    .filter(({ id }) => getLegacyShopifyId(id) !== deletedAddressId);

  return {
    accessToken,
    customer: {
      ...customer,
      addresses: newAddresses
    }
  };
};

const updateAddress = async ({ accessToken, address, id, default = false }) => {
  console.log('default', default);
  const mutation = queries.address.update;
  const variables = { accessToken: accessToken.token, address, id };
  const { customer } = await Customer.get({ accessToken });
  const response = await client.mutate({ mutation, variables });
  const errors = response.data.update.errors || [];

  if (errors.length) {
    throw errors;
  }

  const newAddress = response.data.update.address;
  const newAddressId = getLegacyShopifyId(newAddress.id);
  const newAddresses = customer.addresses
    .map(address => getLegacyShopifyId(address.id) === newAddressId ? newAddress : address);

  if (default) {
    return await _setDefaultAddress({ accessToken, id: newAddress.id });
  }

  return {
    accessToken,
    customer: {
      ...customer,
      addresses: newAddresses
    }
  };
};

module.exports = {
  create: createAddress,
  delete: deleteAddress,
  update: updateAddress,
};
