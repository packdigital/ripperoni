import Client from 'shopify-buy';


const client = Client.buildClient({
  domain: `${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

client.cart = client.checkout;  // alias `checkout` on client with `cart` for continuity

const getTotalItems = cart => {
  return cart.lineItems
    .reduce((totalItems, { quantity }) => totalItems + quantity, 0);
};

export const reducer = (state, action) => {
  console.log('action', action);

  switch (action.type) {
    case 'START_GET_CART':
      return {
        ...state,
        loading: {
          getCart: true,
        },
      };
    case 'FINISH_GET_CART':
      return {
        ...state,
        ...action.data,
        errors: {},
        loading: false,
      };
    case 'ERROR_GET_CART':
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    case 'START_CART_ACTION':
      return {
        ...state,
        loading: {
          [action.request]: true,
        },
      };
    case 'FINISH_CART_ACTION':
      return {
        ...state,
        ...action.data,
        errors: {},
        loading: false,
      };
    case 'ERROR_CART_ACTION':
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    default:
      throw new Error('No such action type: ${action.type}');
  }
};

// ! graphql ids must be btoa encoded before sending to shopify
// actions.cart.updateItem([{ id: lineItemId, quantity: parseInt(qty, 10) }])
// actions.cart.removeItem([ id ])
// actions.cart.addItem([{ variantId: btoa(foreignId), quantity: 1 }]);
// actions.cart.addDiscount(discountCode);

export const asyncActionHandlers = {
  GET_CART: ({ dispatch }) => {
    return async action => {
      dispatch({ type: 'START_GET_CART' });

      try {
        const cart = action.data.cartId
          ? await client.cart.fetch(action.data.cartId)
          : await client.cart.create();

        const totalItems = getTotalItems(cart);

        dispatch({ type: 'FINISH_GET_CART', data: { cart, totalItems }});
      } catch (error) {
        dispatch({ type: 'ERROR_GET_CART', errors: { getCart: error }});
      }
    };
  },
  CART_ACTION: ({ dispatch, getState }) => {
    return async action => {
      dispatch({ type: 'START_CART_ACTION', request: action.request });

      try {
        const cartId = getState().cart.id;
        const cart = await client.cart[action.request](cartId, action.data);

        const totalItems = getTotalItems(cart);

        dispatch({ type: 'FINISH_CART_ACTION', data: { cart, totalItems }});
      } catch (error) {
        dispatch({ type: 'ERROR_CART_ACTION', errors: { [action.request]: error }});
      }
    };
  },
};
