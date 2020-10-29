import React, { createContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

import { useContextFactory } from '@packdigital/ripperoni-utilities';

import { useCartContext } from '@ripperoni/cart';
import { useCustomerContext } from '@ripperoni/account';

import * as topics from './MessageBusTopics';

const MessageBusContext = createContext();

export const useMessageBusContext = useContextFactory(
  'MessageBus',
  MessageBusContext
);

export const MessageBusContextProvider = React.memo(({ children }) => {
  const { state: cartState } = useCartContext();
  const { state: customerState } = useCustomerContext();
  const { cart } = cartState;
  const { ready: customerReady, customer } = customerState;

  const cartRef = useRef(null);
  const customerRef = useRef(null);
  const readyCartRef = useRef(null);
  const readyCustomerRef = useRef(null);

  const logAll = () => {
    // PubSub.subscribeAll((message, data) => console.log(message, data));
  };

  const setCustomerReady = () => {
    if (customerReady && !readyCustomerRef.current) {
      PubSub.publish(topics.CUSTOMER_READY, customer);
      readyCustomerRef.current = true;
      customerRef.current = customer;
    }
  };

  useEffect(logAll, []);
  useEffect(setCustomerReady, [customerReady]);

  useEffect(() => {
    if (!readyCartRef.current) return;

    const updatedAt = cart?.updatedAt;
    const updatedAtRef = cartRef.current?.updatedAt;
    const discounts = cart?.discountApplications.length;
    const discountsRef = cartRef.current?.discountApplications.length;

    if (discounts > discountsRef) {
      PubSub.publish(topics.REMOVE_DISCOUNT, cart);
    }

    if (discounts < discountsRef) {
      PubSub.publish(topics.ADD_DISCOUNT, cart);
    }

    if (updatedAt !== updatedAtRef) {
      cartRef.current = cart;
    }
  }, [cart]);

  useEffect(() => {
    if (readyCustomerRef.current && customer && !customerRef.current) {
      PubSub.publish(topics.CUSTOMER_LOGIN, customer);
      customerRef.current = customer;
      return;
    }

    if (readyCustomerRef.current && !customer && customerRef.current) {
      PubSub.publish(topics.CUSTOMER_LOGOUT, customer);
      customerRef.current = customer;
      return;
    }
  }, [customer]);

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
