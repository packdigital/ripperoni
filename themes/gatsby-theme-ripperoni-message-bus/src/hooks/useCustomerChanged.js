/**
 * @prettier
 */
import { useEffect, useRef } from 'react';
import PubSub from 'pubsub-js';

import { useCustomerContext } from '@ripperoni/account';

import * as topics from '../context/MessageBusTopics';

export const useCustomerChanged = () => {
  const readyRef = useRef(null);
  const customerRef = useRef(null);
  const { state } = useCustomerContext();
  const { ready, customer } = state;

  const setReady = () => {
    if (ready && !readyRef.current) {
      PubSub.publish(topics.CUSTOMER_READY, customer);
      readyRef.current = true;
      customerRef.current = customer;
    }
  };

  const setLoggedIn = () => {
    if (readyRef.current && customer && !customerRef) {
      PubSub.publish(topics.CUSTOMER_LOGIN, customer);
      customerRef.current = customer;
    }
  };

  const setLoggedOut = () => {
    if (readyRef.current && !customer && customerRef) {
      PubSub.publish(topics.CUSTOMER_LOGOUT, customer);
      customerRef.current = customer;
    }
  };

  useEffect(setReady, [ready]);
  useEffect(setLoggedIn, [customer]);
  useEffect(setLoggedOut, [customer]);
};
