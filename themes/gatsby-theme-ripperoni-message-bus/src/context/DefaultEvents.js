/**
 * @prettier
 */
import { useEffect, useRef } from 'react';
import PubSub from 'pubsub-js';

import * as topics from '../context/MessageBusTopics';

const getTotalItems = (items) =>
  items && items.reduce((total, { quantity }) => total + quantity, 0);

export const defaultEvents = (args) => {
  const cartRef = useRef(null);
  const readyCartRef = useRef(null);
  const customerRef = useRef(null);
  const readyCustomerRef = useRef(null);
  const { ready: cartReady, cart } = args.cart.state;
  const { ready: customerReady, customer } = args.customer.state;

  const updateCartRef = () => {
    const updatedAt = cart?.updatedAt;
    const updatedAtRef = cartRef.current?.updatedAt;

    if (updatedAt !== updatedAtRef) {
      cartRef.current = cart;
    }
  };

  const setCartReady = () => {
    if (cartReady && !readyCartRef.current) {
      PubSub.publish(topics.CART_READY, cart);
      readyCartRef.current = true;
    }
  };

  const addToCart = () => {
    const lineItems = cart?.lineItems.length;
    const lineItemsRef = cartRef.current?.lineItems.length;

    if (lineItems > lineItemsRef) {
      PubSub.publish(topics.ADD_TO_CART, cart);
    }
  };

  const removeToCart = () => {
    const lineItems = cart?.lineItems.length;
    const lineItemsRef = cartRef.current?.lineItems.length;

    if (lineItems < lineItemsRef) {
      PubSub.publish(topics.REMOVE_FROM_CART, cart);
    }
  };

  const updateCart = () => {
    const totalItems = getTotalItems(cart?.lineItems);
    const totalItemsRef = getTotalItems(cartRef.current?.lineItems);

    if (totalItems !== totalItemsRef) {
      PubSub.publish(topics.UPDATE_CART, cart);
    }
  };

  const addDiscount = () => {
    const discounts = cart?.discountApplications.length;
    const discountsRef = cartRef.current?.discountApplications.length;

    if (discounts < discountsRef) {
      PubSub.publish(topics.ADD_DISCOUNT, cart);
    }
  };

  const removeDiscount = () => {
    const discounts = cart?.discountApplications.length;
    const discountsRef = cartRef.current?.discountApplications.length;

    if (discounts > discountsRef) {
      PubSub.publish(topics.REMOVE_DISCOUNT, cart);
    }
  };

  const setCustomerReady = () => {
    if (customerReady && !readyCustomerRef.current) {
      PubSub.publish(topics.CUSTOMER_READY, customer);
      readyCustomerRef.current = true;
      customerRef.current = customer;
    }
  };

  const setLoggedIn = () => {
    if (readyCustomerRef.current && customer && !customerRef) {
      PubSub.publish(topics.CUSTOMER_LOGIN, customer);
      customerRef.current = customer;
    }
  };

  const setLoggedOut = () => {
    if (readyCustomerRef.current && !customer && customerRef) {
      PubSub.publish(topics.CUSTOMER_LOGOUT, customer);
      customerRef.current = customer;
    }
  };

  useEffect(setCartReady, [cartReady]);
  useEffect(updateCartRef, [updatedAt]);
  useEffect(addToCart, [lineItems]);
  useEffect(removeToCart, [lineItems]);
  useEffect(updateCart, [totalItems]);
  useEffect(addDiscount, [discounts]);
  useEffect(removeDiscount, [discounts]);
  useEffect(setCustomerReady, [customerReady]);
  useEffect(setLoggedIn, [customer]);
  useEffect(setLoggedOut, [customer]);
};
