/**
 * @prettier
 */
import Client from 'shopify-buy/index.unoptimized.umd';
import update from 'immutability-helper';
// import isBase64 from 'is-base64';

const {
  GATSBY_SHOPIFY_SHOP_NAME: shopName,
  GATSBY_SHOPIFY_CONNECTED_DOMAIN: connectedDomain,
  GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN: storefrontAccessToken,
} = process.env;

const domain = connectedDomain || `${shopName}.myshopify.com`;
const client = Client.buildClient({ domain, storefrontAccessToken });

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_CART': {
      return update(state, {
        cart: { $set: action.data },
      });
    }
    case 'START_CART_ACTION':
      return update(state, {
        loading: {
          [action.name]: { $set: true },
        },
      });
    case 'FINISH_CART_ACTION':
      return update(state, {
        cart: { $set: action.data },
        errors: {
          [action.name]: { $set: [] },
        },
        loading: {
          [action.name]: { $set: false },
        },
      });
    case 'ERROR_CART_ACTION':
      return update(state, {
        errors: {
          [action.name]: { $set: JSON.parse(action.errors) },
        },
        loading: {
          [action.name]: { $set: false },
        },
      });
    case 'ASSOCIATE_CUSTOMER':
      return update(state, {
        associatedWithCustomer: { $set: action.data },
      });
    case 'DISASSOCIATE_CUSTOMER':
      return update(state, {
        associatedWithCustomer: { $set: '' },
      });
    default:
      throw new Error('No such action type: ${action.type}');
  }
};

const getCheckoutId = async (getState) => {
  return getState().cart?.id || client.checkout.create().then(({ id }) => id);
};

const tryRequest = (dispatch) => (fn) => {
  dispatch({ type: 'START_CART_ACTION', name: fn.name });

  // prettier-ignore
  return fn()
    .then((data) => dispatch({ type: 'FINISH_CART_ACTION', name: fn.name, data }))
    .catch((error) => dispatch({ type: 'ERROR_CART_ACTION', name: fn.name, errors: error.message }));
};

export const asyncActions = {
  ADD_LINE_ITEMS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const addLineItems = () => client.checkout.addLineItems(id, data);

    return tryRequest(dispatch)(addLineItems);
  },
  REMOVE_LINE_ITEMS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const removeLineItems = () => client.checkout.removeLineItems(id, data);

    return tryRequest(dispatch)(removeLineItems);
  },
  UPDATE_LINE_ITEMS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const updateLineItems = () => client.checkout.updateLineItems(id, data);

    return tryRequest(dispatch)(updateLineItems);
  },
  ADD_DISCOUNT: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const addDiscount = () => client.checkout.addDiscount(id, data);

    return tryRequest(dispatch)(addDiscount);
  },
  REMOVE_DISCOUNT: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const removeDiscount = () => client.checkout.removeDiscount(id, data);

    return tryRequest(dispatch)(removeDiscount);
  },
  UPDATE_SHIPPING_ADDRESS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    // prettier-ignore
    const updateShippingAddress = () => client.checkout.updateShippingAddress([id, data]);

    return tryRequest(dispatch)(updateShippingAddress);
  },
  UPDATE_SHIPPING_ADDRESS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const updateEmail = () => client.checkout.updateEmail(id, data);

    return tryRequest(dispatch)(updateEmail);
  },
  FETCH_CHECKOUT: ({ dispatch, getState }) => async ({ data }) => {
    const id = data || (await getCheckoutId(getState));
    // prettier-ignore
    const replaceCompletedCart = (cart) => !cart.completedAt ? cart : client.checkout.create();
    const fetchCheckout = () =>
      client.checkout.fetch(id).then(replaceCompletedCart);

    return tryRequest(dispatch)(fetchCheckout);
  },
  // I don't think these actually work 🤷🏻‍♀️
  ASSOCIATE_CART_WITH_CUSTOMER: ({ dispatch, getState }) => async (action) => {
    const name = 'associateCustomer';
    const checkoutId = getState().cart.id;
    const customerAccessToken = action.data.token;
    const args = { checkoutId, customerAccessToken };

    try {
      dispatch({ type: 'START_CART_ACTION', name });

      const result = await CustomerAssociateMutation(args);
      const data = result.data.checkoutCustomerAssociateV2.customer.id;

      dispatch({ type: 'ASSOCIATE_CUSTOMER', name, data });
    } catch (error) {
      dispatch({ type: 'ERROR_CART_ACTION', name, errors: error.message });
    }
  },
  DISASSOCIATE_CART_WITH_CUSTOMER: ({ dispatch, getState }) => async () => {
    const name = 'disassociateCustomer';
    const checkoutId = getState().cart.id;

    try {
      dispatch({ type: 'START_CART_ACTION', name });

      const [newCheckout, disassociate, remove] = await Promise.all([
        client.checkout.updateEmail(checkoutId, ''),
        CustomerDisassociateMutation({ checkoutId }),
        CheckoutRemoveEmailMutation({ checkoutId }),
      ]);

      dispatch({ type: 'DISASSOCIATE_CUSTOMER', name });
    } catch (error) {
      dispatch({ type: 'ERROR_CART_ACTION', name, errors: error.message });
    }
  },
};

const CustomerAssociateMutation = (args) => {
  const mutation = client.checkout.graphQLClient.mutation(
    'checkoutCustomerAssociateV2',
    (mutation) => {
      mutation.add(
        'checkoutCustomerAssociateV2',
        { args },
        (checkoutCustomerAssociateV2) => {
          checkoutCustomerAssociateV2.add(
            'checkoutUserErrors',
            (checkoutUserErrors) => {
              checkoutUserErrors.add('code');
              checkoutUserErrors.add('field');
              checkoutUserErrors.add('message');
            }
          );
          checkoutCustomerAssociateV2.add('customer', (customer) => {
            customer.add('email');
          });
        }
      );
    }
  );

  return client.checkout.graphQLClient.send(mutation);
};

const CustomerDisassociateMutation = (args) => {
  const mutation = client.checkout.graphQLClient.mutation(
    'checkoutCustomerDisassociateV2',
    (mutation) => {
      mutation.add(
        'checkoutCustomerDisassociateV2',
        { args },
        (checkoutCustomerDisassociateV2) => {
          checkoutCustomerDisassociateV2.add(
            'checkoutUserErrors',
            (checkoutUserErrors) => {
              checkoutUserErrors.add('code');
              checkoutUserErrors.add('field');
              checkoutUserErrors.add('message');
            }
          );
          checkoutCustomerDisassociateV2.add('checkout', (checkout) => {
            checkout.add('id');
            checkout.add('email');
          });
        }
      );
    }
  );

  return client.checkout.graphQLClient.send(mutation);
};

const CheckoutRemoveEmailMutation = (args) => {
  const mutation = client.checkout.graphQLClient.mutation(
    'checkoutEmailUpdateV2',
    (mutation) => {
      mutation.add(
        'checkoutEmailUpdateV2',
        { args: { checkoutId: args.checkoutId, email: '' } },
        (checkoutEmailUpdateV2) => {
          checkoutEmailUpdateV2.add(
            'checkoutUserErrors',
            (checkoutUserErrors) => {
              checkoutUserErrors.add('code');
              checkoutUserErrors.add('field');
              checkoutUserErrors.add('message');
            }
          );
          checkoutEmailUpdateV2.add('checkout', (checkout) => {
            checkout.add('id');
            checkout.add('email');
          });
        }
      );
    }
  );

  return client.checkout.graphQLClient.send(mutation);
};

// const asyncActionWrapper = (asyncAction) => (reducerAsync) => (action) => {
//   const { dispatch, getState } = reducerAsync;
//   const name = asyncAction.name;
//   const checkout = getState().cart;
//   const args = [checkout?.id, action.data];

//   validateGids(args, name);

//   dispatch({ type: 'START_CART_ACTION', name });

//   const handleSuccess = (data) => {
//     console.log('data', data);

//     return dispatch({ type: 'FINISH_CART_ACTION', name, data });
//   };

//   const handleError = (error) => {
//     console.error('error', error);

//     return dispatch({ type: 'ERROR_CART_ACTION', name, errors: error.message });
//   };

//   asyncAction.action(args).then(handleSuccess).catch(handleError);
// };

// import { isShopifyGid } from '@packdigital/ripperoni-utilities';
// let data = action.data;

// ! graphql ids must be btoa encoded before sending to shopify
// allow any type of variant id (legacy, unencoded, encoded) to be passed in addToCart
// this probably shouldn't go here...
// if (action.request === 'addLineItems') {
//   const items = Array.isArray(data) ? data : [data];

//   data = items.map(({ variantId, ...variant }) => {
//     const isBase64 = isBase64Encoded(variantId);
//     const rawId = isBase64 ? atob(variantId) : variantId;
//     const isGid = isShopifyGid(rawId);
//     const normalizedVariantId = isGid
//       ? btoa(rawId)
//       : btoa(`gid://shopify/ProductVariant/${rawId}`);

//     return { ...variant, variantId: normalizedVariantId };
//   });
// }

// const checkoutId = getState().cart.id;
// const cart = await client.checkout[action.request](checkoutId, data);

// const validateGids = ([id, data], name) => {
//   // 1. first arg is always base64 id
//   if (id && !isBase64(id)) {
//     throw new Error(`Invalid checkout id provided to ${name}:
//       ${id}
//       \nAll GraphQL IDs need to be base64 encoded before being sent to Shopify Storefront API.`);
//   }

//   // 2. second arg can be string, object, or array
//   const isStringOrObject = (data) => ['string', 'object'].includes(typeof data);

//   // arrays are the only type containing base64 ids
//   // array indexes can be:
//   //   A. object with key including `id` and a value of base64 id
//   const keyIsId = (key) => key.toLowerCase().endsWith('id');
//   const keyValueIsValid = ([key, value]) => keyIsId(key) && isBase64(value);
//   const hasValidKeyValue = (object) =>
//     Object.entries(object).some(keyValueIsValid);

//   //   B. base64 id string
//   const indexIsValid = (index) => isBase64(index) || hasValidKeyValue(index);

//   // [2]
//   const dataIsValid = Array.isArray(data)
//     ? data.every(indexIsValid)
//     : isStringOrObject(data);

//   if (data && !dataIsValid) {
//     throw new Error(`Invalid data provided to ${name}:
//       ${JSON.stringify(data)}
//       \nAll GraphQL IDs need to be base64 encoded before being sent to Shopify Storefront API.`);
//   }
// };
