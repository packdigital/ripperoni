/**
 * @prettier
 */
import { useEffect, useRef } from 'react';
import PubSub from 'pubsub-js';

import { useCartContext } from '@ripperoni/cart';

import * as topics from '../context/MessageBusTopics';

const getTotalItems = (items) =>
  items && items.reduce((total, { quantity }) => total + quantity, 0);

export const useCartChanged = () => {
  const cartRef = useRef(null);
  const readyRef = useRef(null);
  const { state } = useCartContext();
  const { ready, cart } = state;

  const updatedAt = cart?.updatedAt;
  const updatedAtRef = cartRef.current?.updatedAt;

  const lineItems = cart?.lineItems.length;
  const lineItemsRef = cartRef.current?.lineItems.length;

  const totalItems = getTotalItems(cart?.lineItems);
  const totalItemsRef = getTotalItems(cartRef.current?.lineItems);

  const discounts = cart?.discountApplications.length;
  const discountsRef = cartRef.current?.discountApplications.length;

  const updateRef = () => {
    if (updatedAt !== updatedAtRef) {
      cartRef.current = cart;
    }
  };

  const setReady = () => {
    if (ready && !readyRef.current) {
      PubSub.publish(topics.CART_READY, cart);
      readyRef.current = true;
    }
  };

  const addToCart = () => {
    if (lineItems > lineItemsRef) {
      PubSub.publish(topics.ADD_TO_CART, cart);
    }
  };

  const removeToCart = () => {
    if (lineItems < lineItemsRef) {
      PubSub.publish(topics.REMOVE_FROM_CART, cart);
    }
  };

  const updateCart = () => {
    if (totalItems !== totalItemsRef) {
      PubSub.publish(topics.UPDATE_CART, cart);
    }
  };

  const addDiscount = () => {
    if (discounts < discountsRef) {
      PubSub.publish(topics.ADD_DISCOUNT, cart);
    }
  };

  const removeDiscount = () => {
    if (discounts > discountsRef) {
      PubSub.publish(topics.REMOVE_DISCOUNT, cart);
    }
  };

  useEffect(setReady, [ready]);
  useEffect(updateRef, [updatedAt]);
  useEffect(addToCart, [lineItems]);
  useEffect(removeToCart, [lineItems]);
  useEffect(updateCart, [totalItems]);
  useEffect(addDiscount, [discounts]);
  useEffect(removeDiscount, [discounts]);
};
