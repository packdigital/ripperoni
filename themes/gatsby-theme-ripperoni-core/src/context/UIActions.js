// Actions
const TOGGLE_CART = 'TOGGLE_CART';
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const SHOW_SECONDARY_NAVIGATION = 'SHOW_SECONDARY_NAVIGATION';
const HIDE_SECONDARY_NAVIGATION = 'HIDE_SECONDARY_NAVIGATION';
const SHOW_MOBILE_NAVIGATION = 'SHOW_MOBILE_NAVIGATION';
const HIDE_MOBILE_NAVIGATION = 'HIDE_MOBILE_NAVIGATION';

export const createActions = dispatch => {
  return {
    toggleCart: () => {
      dispatch({ type: TOGGLE_CART });
    },
    toggleModal: (modalId) => {
      dispatch({ type: TOGGLE_MODAL, modalId });
    },
    showSecondaryNavigation: data => {
      dispatch({ type: SHOW_SECONDARY_NAVIGATION, data });
    },
    hideSecondaryNavigation: () => {
      dispatch({ type: HIDE_SECONDARY_NAVIGATION });
    },
    showMobileNavigation: data => {
      dispatch({ type: SHOW_MOBILE_NAVIGATION, data });
    },
    hideMobileNavigation: () => {
      dispatch({ type: HIDE_MOBILE_NAVIGATION });
    },
  };
};
