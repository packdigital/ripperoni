// Actions
const TOGGLE_CART = 'TOGGLE_CART';
const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const createActions = dispatch => {
  return {
    toggleCart: () => {
      dispatch({ type: TOGGLE_CART });
    },
    toggleModal: () => {
      dispatch({ type: TOGGLE_MODAL });
    },
  };
};
