/**
 * @prettier
 */
import Client from 'shopify-buy/index.unoptimized.umd';
import isBase64 from 'is-base64';
import update from 'immutability-helper';

export const reducer = (state, action) => {
  console.log('action:cart', action);

  switch (action.type) {
    case 'SET_CART_READY':
      return update(state, {
        ready: { $set: true },
      });
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
    case 'UPDATE_TOTAL_ITEMS_COUNT':
      return update(state, {
        totalItems: { $set: action.data },
      });
    default:
      throw new Error('No such action type: ${action.type}');
  }
};

const client = Client.buildClient({
  domain: `${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

const validateGids = ([id, data], name) => {
  // asyncActions can have arity of 0, 1, 2

  // 1. first arg is always base64 id
  if (id && !isBase64(id)) {
    throw new Error(`Invalid checkout id provided to ${name}:
      ${id}
      \nAll GraphQL IDs need to be base64 encoded before being sent to Shopify Storefront API.`);
  }

  // 2. second arg can be string, object, or array
  const isStringOrObject = (data) => ['string', 'object'].includes(typeof data);

  // arrays are the only type containing base64 ids
  // array indexes can be:
  //   A. object with key including `id` and a value of base64 id
  const keyIsId = (key) => key.toLowerCase().endsWith('id');
  const keyValueIsValid = ([key, value]) => keyIsId(key) && isBase64(value);
  const hasValidKeyValue = (object) =>
    Object.entries(object).some(keyValueIsValid);

  //   B. base64 id string
  const indexIsValid = (index) => isBase64(index) || hasValidKeyValue(index);

  // [2]
  const dataIsValid = Array.isArray(data)
    ? data.every(indexIsValid)
    : isStringOrObject(data);

  if (data && !dataIsValid) {
    throw new Error(`Invalid data provided to ${name}:
      ${JSON.stringify(data)}
      \nAll GraphQL IDs need to be base64 encoded before being sent to Shopify Storefront API.`);
  }
};

const asyncActionWrapper = (asyncAction) => (reducerAsync) => (action) => {
  const { dispatch, getState } = reducerAsync;
  const name = asyncAction.name;
  const checkout = getState().cart;
  const args = [checkout?.id, action.data];

  validateGids(args, name);

  dispatch({ type: 'START_CART_ACTION', name });

  const handleSuccess = (data) =>
    dispatch({ type: 'FINISH_CART_ACTION', name, data });

  const handleError = (error) =>
    dispatch({ type: 'ERROR_CART_ACTION', name, errors: error.message });

  asyncAction.action(args).then(handleSuccess).catch(handleError);
};

export const asyncActionHandlers = {
  CREATE_CHECKOUT: asyncActionWrapper({
    name: client.checkout.create.name,
    action: (args) => client.checkout.create(...args),
  }),
  ADD_LINE_ITEMS: asyncActionWrapper({
    name: client.checkout.addLineItems.name,
    action: (args) => client.checkout.addLineItems(...args),
  }),
  REMOVE_LINE_ITEMS: asyncActionWrapper({
    name: client.checkout.removeLineItems.name,
    action: (args) => client.checkout.removeLineItems(...args),
  }),
  UPDATE_LINE_ITEMS: asyncActionWrapper({
    name: client.checkout.updateLineItems.name,
    action: (args) => client.checkout.updateLineItems(...args),
  }),
  ADD_DISCOUNT: asyncActionWrapper({
    name: client.checkout.addDiscount.name,
    action: (args) => client.checkout.addDiscount(...args),
  }),
  REMOVE_DISCOUNT: asyncActionWrapper({
    name: client.checkout.removeDiscount.name,
    action: (args) => client.checkout.removeDiscount(...args),
  }),
  UPDATE_SHIPPING_ADDRESS: asyncActionWrapper({
    name: client.checkout.updateShippingAddress.name,
    action: (args) => client.checkout.updateShippingAddress(...args),
  }),
  UPDATE_SHIPPING_ADDRESS: asyncActionWrapper({
    name: client.checkout.updateEmail.name,
    action: (args) => client.checkout.updateEmail(...args),
  }),
  FETCH_CHECKOUT: ({ dispatch }) => async (action) => {
    const name = client.checkout.fetch.name;

    try {
      dispatch({ type: 'START_CART_ACTION', name });

      const data = await client.checkout.fetch(action.data);

      dispatch({ type: 'FINISH_CART_ACTION', name, data });
    } catch (error) {
      dispatch({ type: 'ERROR_CART_ACTION', name, errors: error.message });
      dispatch({ type: 'CREATE_CHECKOUT' });
    }
  },
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

// import { isShopifyGid } from '@packdigital/ripperoni-utilities';
// let data = action.data;

// // ! graphql ids must be btoa encoded before sending to shopify
// // allow any type of variant id (legacy, unencoded, encoded) to be passed in addToCart
// // this probably shouldn't go here...
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
