// Actions
const TOGGLE_CART = 'TOGGLE_CART';
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const SHOW_MEGA_NAV = 'SHOW_MEGA_NAV';
const HIDE_MEGA_NAV = 'HIDE_MEGA_NAV';

export const createActions = dispatch => {
  return {
    toggleCart: () => {
      dispatch({ type: TOGGLE_CART });
    },
    toggleModal: () => {
      dispatch({ type: TOGGLE_MODAL });
    },
    showMegaNav: data => {
      dispatch({ type: SHOW_MEGA_NAV, data });
    },
    hideMegaNav: () => {
      dispatch({ type: HIDE_MEGA_NAV });
    },
  };
};
