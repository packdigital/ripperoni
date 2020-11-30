/**
 * @prettier
 */
import Client from 'shopify-buy';
import update from 'immutability-helper';

// prettier-ignore
const storefrontAccessToken = process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const shopName = process.env.GATSBY_SHOPIFY_SHOP_NAME;
const connectedDomain = process.env.GATSBY_SHOPIFY_CONNECTED_DOMAIN;
export const domain = connectedDomain || `${shopName}.myshopify.com`;

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
          [action.name]: { $set: action.errors },
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
  const currentCartId = getState().cart?.id;

  if (currentCartId) {
    return currentCartId;
  }

  return await client.checkout.create().then(({ id }) => id);
};

const tryRequest = (dispatch) => async (fn) => {
  const name = fn.name;

  dispatch({ type: 'START_CART_ACTION', name });

  const successHandler = (data) => {
    dispatch({ type: 'FINISH_CART_ACTION', name, data });
  };

  const errorHandler = (error) => {
    let errors;

    try {
      errors = JSON.parse(error.message);
    } catch {
      errors = error.message;
    }

    dispatch({ type: 'ERROR_CART_ACTION', name, errors });
  };

  // prettier-ignore
  return fn()
    .then(successHandler)
    .catch(errorHandler);
};

export const asyncActions = {
  ADD_LINE_ITEMS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const addLineItems = () => client.checkout.addLineItems(id, data);

    tryRequest(dispatch)(addLineItems);
  },
  REMOVE_LINE_ITEMS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const removeLineItems = () => client.checkout.removeLineItems(id, data);

    tryRequest(dispatch)(removeLineItems);
  },
  UPDATE_LINE_ITEMS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const updateLineItems = () => client.checkout.updateLineItems(id, data);

    tryRequest(dispatch)(updateLineItems);
  },
  ADD_DISCOUNT: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const addDiscount = () => client.checkout.addDiscount(id, data);

    tryRequest(dispatch)(addDiscount);
  },
  REMOVE_DISCOUNT: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const removeDiscount = () => client.checkout.removeDiscount(id, data);

    tryRequest(dispatch)(removeDiscount);
  },
  UPDATE_SHIPPING_ADDRESS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    // prettier-ignore
    const updateShippingAddress = () => client.checkout.updateShippingAddress([id, data]);

    tryRequest(dispatch)(updateShippingAddress);
  },
  UPDATE_SHIPPING_ADDRESS: ({ dispatch, getState }) => async ({ data }) => {
    const id = await getCheckoutId(getState);
    const updateEmail = () => client.checkout.updateEmail(id, data);

    tryRequest(dispatch)(updateEmail);
  },
  FETCH_CHECKOUT: ({ dispatch, getState }) => async () => {
    const id = await getCheckoutId(getState);
    const currentCheckout = client.checkout.fetch(id);
    const { completedAt } = await currentCheckout;
    const fetchCheckout = completedAt
      ? () => client.checkout.create()
      : () => currentCheckout;

    tryRequest(dispatch)(fetchCheckout);
  },
};
