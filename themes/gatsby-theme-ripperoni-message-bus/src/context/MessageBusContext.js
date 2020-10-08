/**
 * @prettier
 */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import { useContextFactory } from '@packdigital/ripperoni-utilities';

import { useCartContext } from '@ripperoni/cart';
import { useCustomerContext } from '@ripperoni/account';

import * as topics from './MessageBusTopics';
import { defaultEvents } from './defaultEvents';

const MessageBusContext = createContext();

export const useMessageBusContext = useContextFactory(
  'MessageBus',
  MessageBusContext
);

export const MessageBusContextProvider = React.memo(({ children }) => {
  const cart = useCartContext();
  const customer = useCustomerContext();
  defaultEvents({ cart, customer });

  // PubSub.subscribeAll((message, data) => console.log(message, data));

  const value = {
    topics,
    PubSub,
    ...PubSub,
  };

  return (
    <MessageBusContext.Provider value={value}>
      {children}
    </MessageBusContext.Provider>
  );
});

MessageBusContextProvider.displayName = 'Message Bus Context Provider';

MessageBusContextProvider.propTypes = {
  children: PropTypes.any,
};
