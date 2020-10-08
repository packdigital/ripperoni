/**
 * @prettier
 */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import { useContextFactory } from '@packdigital/ripperoni-utilities';

const DebugContext = createContext();

export const useDebugContext = useContextFactory('Debug', DebugContext);

export const DebugContextProvider = React.memo(({ children }) => {
  const value = {
    // toggleLogging,
  };

  return (
    <DebugContext.Provider value={value}>{children}</DebugContext.Provider>
  );
});

DebugContextProvider.displayName = 'Debug Context Provider';

DebugContextProvider.propTypes = {
  children: PropTypes.any,
};
