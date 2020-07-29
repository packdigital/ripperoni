import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { useContextFactory } from '@packdigital/ripperoni-utilities';

import { reducer } from './UIReducer';
import { createActions } from './UIActions';


const UIContext = createContext();

export const useUIContext = useContextFactory('UIContext', UIContext);

const initialState = {
  cart: false,
  modal: false,
};

export const UIContextProvider = React.memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = createActions(dispatch);

  const value = {
    state,
    ...actions,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
});

UIContextProvider.displayName = 'UI Context Provider';

UIContextProvider.propTypes = {
  children: PropTypes.any
};
