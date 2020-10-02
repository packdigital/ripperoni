require('dotenv').config();

const Address = require('./address');
const Customer = require('./customer');
const Password = require('./password');

const actions = {
  'customerGet': Customer.get,
  'customerLogin': Customer.get,
  'customerCreate': Customer.create,
  'passwordRecover': Password.recover,
  'passwordReset': Password.reset,
  'addressCreate': Address.create,
  'addressDelete': Address.delete,
  'addressUpdate': Address.update,
  'customerLoginOrCreate': Customer.loginOrCreate,
};

const errorMessages = {
  'UNIDENTIFIED_CUSTOMER': 'Incorrect Email or Password',
  'TOO_SHORT': 'Password is too short (minimum is 5 characters)',
  'TAKEN': 'Email has already been taken',
  'INVALID': 'Email is invalid',
  'BAD_DOMAIN': 'Email contains an invalid domain name',
};

const getErrors = error => {
  if (error.graphQLErrors) {
    return error.graphQLErrors.map(({ message }) => message);
  }

  if (error.map) {
    return error.map(({ message, code }) =>
      message || errorMessages[code] || 'Error! please try again later.');
  }

  return error;
};

module.exports = async event => {
  try {
    const body = JSON.parse(event.body);
    // console.log('body', body);

    if (!body.action) {
      throw new Error([{ message: 'NO REQUEST ACTION SENT' }]);
    }

    const data = await actions[body.action](body);

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (error) {
    console.log('error', error);

    const errors = getErrors(error);

    return {
      statusCode: 200,
      body: JSON.stringify({ errors })
    };
  }
};


// if (!accessToken && !hasCredentials) {
//   return {
//     ok: false,
//     errors: [{
//       code: 'BAD_CREDENTIALS',
//       field: [ 'email', 'password' ],
//       message: 'Please Adjust The Following: Incorrect Email Or Password.',
//     }]
//   };
// }


// code: "GRAPHQL_ERROR"
// field: null
// message: "Resetting password limit exceeded. Please try again later."
