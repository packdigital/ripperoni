// import { isBrowser } from '@packdigital/ripperoni-utilities';

// // import useGlobal from '@theme/store';


// export const useCustomer = (customerState, setCustomerState) => {
//   // const [{ customer }, actions] = useGlobal();


//   const init = async () => {


//     if (accessToken) {
//       const response = await actions.get({ accessToken });

//       return actions.set(response.data);
//     } else {
//       return actions.logout();
//     }
//   };

//   const setCustomer = data => {
//     const newCustomer = { ...data, logged_in: true };

//     window.ShopifyCustomer = newCustomer;
//     window.localStorage.setItem('customer', JSON.stringify({ accessToken: data.accessToken }));
//     setCustomerState(newCustomer);

//     return { customer: newCustomer };
//   };

//   const logout = () => {
//     const newCustomer = { logged_in: false };
//     window.ShopifyCustomer = undefined;
//     window.localStorage.removeItem('customer');
//     setCustomerState(newCustomer);

//     return { customer: newCustomer };
//   };

//   return {
//     init,
//     logout,
//     set: setCustomer,
//     get: requestCustomer('get'),
//     login: requestCustomer('login'),
//     create: requestCustomer('create'),
//     loginOrCreate: requestCustomer('login-or-create'),
//     forgot: requestCustomer('recover'),
//     reset: requestCustomer('reset'),
//     address: {
//       create: requestCustomer('address-create'),
//       update: requestCustomer('address-update'),
//       delete: requestCustomer('address-delete'),
//       default: requestCustomer('address-default'),
//     }
//   };
// };

// actions.get();
