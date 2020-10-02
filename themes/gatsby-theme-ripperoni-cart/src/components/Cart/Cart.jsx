import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { FlexCol, Loader, Overlay } from '@ripperoni/components';
import { CartHeader } from '@ripperoni/cart/components/CartHeader';
import { CartLineItems } from '@ripperoni/cart/components/CartLineItems';
import { CartEmptyState } from '@ripperoni/cart/components/CartEmptyState';
// import { CartUpsell } from '@ripperoni/cart/components/CartUpsell';
import { CartTotals } from '@ripperoni/cart/components/CartTotals';
import { useCartContext } from '@ripperoni/cart/context/CartContext';
import { useUIContext } from '@ripperoni/core/context/UIContext';


const AnimatedCart = motion.custom(FlexCol);

export const Cart = ({checkoutParams, ...props}) => {
  const { state: cartState } = useCartContext();
  const { state: uiState, toggleCart } = useUIContext();
  const lineItems = cartState?.cart?.lineItems;
  const isLoading = Object.values(cartState.loading).some(Boolean)

  return (
    <>
      <AnimatePresence>
        {uiState.cart && (
          <Overlay onClick={toggleCart} />
        )}
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
            height='100vh'
            zIndex={3}
            variants={variants}
            initial='initial'
            animate='completed'
            exit='initial'
            {...props}
          >
            <CartHeader />

            <Loader.Hoc loading={isLoading}>
              {lineItems?.length === 0 && (
                <CartEmptyState />
              )}

              {lineItems?.length > 0 && (
                <>
                  <CartLineItems lineItems={lineItems} />

                  {/* <CartUpsell /> */}

                  <CartTotals
                    subtotal={cartState.cart.subtotalPrice}
                    checkoutUrl={cartState.cart.webUrl + checkoutParams}
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

const variants = {
  initial: {
    x: '100%',
    transition: {
      ease: 'linear',
      duration: 0.2
    },
  },
  completed: {
    x: 0,
    transition: {
      ease: 'linear',
      duration: 0.2
    },
  },
};
