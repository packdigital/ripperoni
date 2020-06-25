require('dotenv').config();

const { Address, Customer, Password } = require('@packdigital/ripperoni-account');


const actions = {
  'customer-get': Customer.get,
  'customer-login': Customer.get,
  'customer-create': Customer.create,
  'password-recover': Password.recover,
  'password-reset': Password.reset,
  'address-create': Address.create,
  'address-delete': Address.delete,
  'address-update': Address.update,
  'address-default': Address.default,
  'customer-login-or-create': Customer.loginOrCreate,
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

  return error.map(({ message, code }) =>
    message || errorMessages[code] || 'Error! please try again later.');
};

exports.handler = async event => {
  try {
    const body = JSON.parse(event.body);
    // console.log('body', body);

    if (!body.action) {
      throw new Error([{ message: 'NO REQUEST ACTION SENT' }]);
    }

    const data = await actions[body.action](body);
    // console.log('data', data);

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (error) {
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
