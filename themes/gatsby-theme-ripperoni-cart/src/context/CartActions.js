const REFRESH_CART = 'REFRESH_CART';
const CREATE_CHECKOUT = 'CREATE_CHECKOUT';
const FETCH_CHECKOUT = 'FETCH_CHECKOUT';
const ADD_LINE_ITEMS = 'ADD_LINE_ITEMS';
const REMOVE_LINE_ITEMS = 'REMOVE_LINE_ITEMS';
const UPDATE_LINE_ITEMS = 'UPDATE_LINE_ITEMS';
const ADD_DISCOUNT = 'ADD_DISCOUNT';
const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT';
const UPDATE_SHIPPING_ADDRESS = 'UPDATE_SHIPPING_ADDRESS';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const ASSOCIATE_CUSTOMER = 'ASSOCIATE_CUSTOMER';
const ASSOCIATE_CART_WITH_CUSTOMER = 'ASSOCIATE_CART_WITH_CUSTOMER';
const DISASSOCIATE_CART_WITH_CUSTOMER = 'DISASSOCIATE_CART_WITH_CUSTOMER';

export const createActions = (dispatch) => {
  return {
    refreshCart: (data) => {
      dispatch({ type: REFRESH_CART, data });
    },
    createCheckout: () => {
      dispatch({ type: CREATE_CHECKOUT });
    },
    fetchCheckout: (data) => {
      dispatch({ type: FETCH_CHECKOUT, data });
    },
    addLineItems: (data) => {
      dispatch({ type: ADD_LINE_ITEMS, data });
    },
    removeLineItems: (data) => {
      dispatch({ type: REMOVE_LINE_ITEMS, data });
    },
    updateLineItems: (data) => {
      dispatch({ type: UPDATE_LINE_ITEMS, data });
    },
    addDiscount: (data) => {
      dispatch({ type: ADD_DISCOUNT, data });
    },
    removeDiscount: () => {
      dispatch({ type: REMOVE_DISCOUNT });
    },
    updateShippingAddress: (data) => {
      dispatch({ type: UPDATE_SHIPPING_ADDRESS, data });
    },
    updateEmail: (data) => {
      dispatch({ type: UPDATE_EMAIL, data });
    },
    associateCustomer: (data) => {
      dispatch({ type: ASSOCIATE_CUSTOMER, data });
    },
    associateCartWithCustomer: (data) => {
      dispatch({ type: ASSOCIATE_CART_WITH_CUSTOMER, data });
    },
    disassociateCustomer: () => {
      dispatch({ type: DISASSOCIATE_CART_WITH_CUSTOMER });
    },
  };
};
