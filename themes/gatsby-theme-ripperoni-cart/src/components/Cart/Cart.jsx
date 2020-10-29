import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

import { useUIContext } from '@ripperoni/core';
import { FlexCol, Loader, Overlay } from '@ripperoni/components';

import { CartUpsell } from '../CartUpsell';
import { CartHeader } from '../CartHeader';
import { CartTotals } from '../CartTotals';
import { CartLineItems } from '../CartLineItems';
import { CartEmptyState } from '../CartEmptyState';
import { useCartContext } from '../../context/CartContext';
import { useCart } from '../../hooks/useCart';

const AnimatedCart = motion.custom(FlexCol);

export const Cart = ({ checkoutParams, checkoutUrlCallback, ...props }) => {
  const cart = useCart();
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const { state: cartState } = useCartContext();
  const { state: uiState, toggleCart } = useUIContext();

  const lineItems = cart?.lineItems;
  const isLoading = Object.values(cartState.loading).some(Boolean);

  useEffect(() => {
    let checkoutUrl = cartState?.cart?.webUrl;

    if (cartState && checkoutUrlCallback) {
      checkoutUrl =
        checkoutUrlCallback(cartState?.cart?.webUrl) || cartState?.cart?.webUrl;
    }

    setCheckoutUrl(checkoutUrl);
  }, [cartState]);

  return (
    <>
      <AnimatePresence>
        {uiState.cart && <Overlay onClick={toggleCart} />}
      </AnimatePresence>

      <AnimatePresence>
        {uiState.cart && (
          <AnimatedCart
            data-comp={Cart.displayName}
            bg='white'
            position='fixed'
            width={['100%', '400px']}
            top={0}
            right={0}
            bottom={0}
            zIndex={3}
            variants={variants}
            initial='initial'
            animate='completed'
            exit='initial'
            sx={{
              height: '100%',
              minHeight: '100vh',
              minHeight: '-webkit-fill-available',
            }}
            {...props}
          >
            <CartHeader />

            <Loader.Hoc loading={isLoading}>
              {lineItems?.length === 0 && <CartEmptyState />}

              {lineItems?.length > 0 && (
                <>
                  <CartLineItems lineItems={lineItems} />

                  <CartUpsell />

                  <CartTotals
                    subtotal={cart.subtotalPrice}
                    checkoutUrl={checkoutUrl + checkoutParams}
                  />
                </>
              )}
            </Loader.Hoc>
          </AnimatedCart>
        )}
      </AnimatePresence>
    </>
  );
};

Cart.displayName = 'Cart';

Cart.propTypes = {
  checkoutParams: PropTypes.string,
  checkoutUrlCallback: PropTypes.func,
};

const variants = {
  initial: {
    x: '100%',
    transition: {
      ease: 'linear',
      duration: 0.2,
    },
  },
  completed: {
    x: 0,
    transition: {
      ease: 'linear',
      duration: 0.2,
    },
  },
};
