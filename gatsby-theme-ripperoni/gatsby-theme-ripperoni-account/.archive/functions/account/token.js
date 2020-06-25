const client = require('./client');
const queries = require('./queries');


const _isTokenActive = accessToken => {
  const now = new Date().getTime();
  const then = new Date(accessToken .expires).getTime();
  const tokenActive = then > now;

  return tokenActive;
};

const getAccessToken = async ({ email, password }) => {
  const mutation = queries.token.create;
  const variables = { input: { email, password }};
  const { data: { createToken }} = await client.mutate({ mutation, variables });
  const { accessToken, errors = [] } = createToken;

  if (errors.length) {
    throw createToken.errors;
  }

  return accessToken;
};


module.exports = {
  get: getAccessToken,
};
