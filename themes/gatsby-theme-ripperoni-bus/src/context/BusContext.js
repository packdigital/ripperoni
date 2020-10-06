/**
 * @prettier
 */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

import { useCartContext } from '@packdigital/gatsby-theme-ripperoni-cart';
import { useAccountContext } from '@packdigital/gatsby-theme-ripperoni-account';
import { useContextFactory } from '@packdigital/ripperoni-utilities';

import * as BusTopics from './BusTopics';

const BusContext = createContext();

export * from 'pubsub-js';
export * as PubSub from 'pubsub-js';

export const useBusContext = useContextFactory('Bus', BusContext);

export const BusContextProvider = React.memo(({ children }) => {
  PubSub.subscribeAll((message, data) => console.log(message, data));

  const value = {
    ...PubSub,
    ...BusTopics,
  };

  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
});

BusContextProvider.displayName = 'Bus Context Provider';

BusContextProvider.propTypes = {
  children: PropTypes.any,
};
