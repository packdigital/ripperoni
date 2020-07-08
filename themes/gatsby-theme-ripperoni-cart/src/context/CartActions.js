// Actions
const GET_CART = 'GET_CART';
const CART_ACTION = 'CART_ACTION';

// Cart Action Types
const ADD_LINE_ITEMS = 'addLineItems';
const REMOVE_LINE_ITEMS = 'removeLineItems';
const UPDATE_LINE_ITEMS = 'updateLineItems';
const ADD_DISCOUNT = 'addDiscount';
const REMOVE_DISCOUNT = 'removeDiscount';
const UPDATE_SHIPPING_ADDRESS = 'updateShippingAddress';

export const createActions = dispatch => {
  return {
    getCart: data => {
      dispatch({ type: GET_CART, data });
    },
    addLineItems: data => {
      dispatch({ type: CART_ACTION, request: ADD_LINE_ITEMS, data });
    },
    removeLineItems: data => {
      dispatch({ type: CART_ACTION, request: REMOVE_LINE_ITEMS, data });
    },
    updateLineItems: data => {
      dispatch({ type: CART_ACTION, request: UPDATE_LINE_ITEMS, data });
    },
    addDiscount: data => {
      dispatch({ type: CART_ACTION, request: ADD_DISCOUNT, data });
    },
    removeDiscount: () => {
      dispatch({ type: CART_ACTION, request: REMOVE_DISCOUNT });
    },
    updateShippingAddress: data => {
      dispatch({ type: CART_ACTION, request: UPDATE_SHIPPING_ADDRESS, data });
    }
  };
};
