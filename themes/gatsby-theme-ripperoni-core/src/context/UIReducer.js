export const reducer = (state, action) => {
  // console.log('action:theme', action);

  switch (action.type) {
    case 'TOGGLE_CART':
      return {
        ...state,
        cart: !state.cart,
        modal: false,
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        cart: false,
        modal: state.modal ? false : action.modalId,
      };
    case 'SHOW_SECONDARY_NAVIGATION':
      return {
        ...state,
        secondaryNavigation: action.data,
      };
    case 'HIDE_SECONDARY_NAVIGATION':
      return {
        ...state,
        secondaryNavigation: false,
      };
    case 'SHOW_MOBILE_NAVIGATION':
      return {
        ...state,
        mobileNavigation: action.data,
      };
    case 'HIDE_MOBILE_NAVIGATION':
      return {
        ...state,
        mobileNavigation: false,
      };
    default:
      throw new Error(`No such action type: ${action.type}`);
  }
};
