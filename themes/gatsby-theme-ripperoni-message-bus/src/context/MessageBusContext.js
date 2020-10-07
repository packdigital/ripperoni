/**
 * @prettier
 */
import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

import { useCartContext } from '@packdigital/gatsby-theme-ripperoni-cart';
import { useAccountContext } from '@packdigital/gatsby-theme-ripperoni-account';
import { useContextFactory } from '@packdigital/ripperoni-utilities';

import * as MessageBusTopics from './MessageBusTopics';

const MessageBusContext = createContext();

export const useMessageBusContext = useContextFactory(
  'MessageBus',
  MessageBusContext
);

export const MessageBusContextProvider = React.memo(({ children }) => {
  PubSub.subscribeAll((message, data) => console.log(message, data));

  const value = {
    PubSub,
    ...PubSub,
    topics: MessageBusTopics,
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
