export const reducer = (state, action) => {
  console.log('action', action);

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
        modal: !state.modal,
      };
    case 'SHOW_MEGA_NAV':
      return {
        ...state,
        megaNav: action.data,
      };
    case 'HIDE_MEGA_NAV':
      return {
        ...state,
        megaNav: null,
      };
    default:
      throw new Error('No such action type: ${action.type}');
  }
};
