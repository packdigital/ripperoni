import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, FlexCol, Overlay } from '@ripperoni/components';
import { CartHeader } from '@ripperoni/cart/components/CartHeader';
import { CartLineItem } from '@ripperoni/cart/components/CartLineItem';
import { CartEmptyState } from '@ripperoni/cart/components/CartEmptyState';
// import { CartUpsell } from '@ripperoni/cart/components/CartUpsell';
import { CartTotals } from '@ripperoni/cart/components/CartTotals';
import { useCartContext } from '@ripperoni/cart/context/CartContext';
import { useUIContext } from '@ripperoni/core/context/UIContext';


const AnimatedCart = motion.custom(FlexCol);

export const Cart = props => {
  const { state: cartState, addLineItems } = useCartContext();
  const { state: uiState, toggleCart } = useUIContext();

  const lineItems = cartState?.cart?.lineItems;

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
            width='400px'
            top={0}
            right={0}
            bottom={0}
            zIndex={3}
            variants={variants}
            initial='initial'
            animate='completed'
            exit='initial'
            {...props}
          >
            <CartHeader />

            <Button onClick={() => {
              const variantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yMDA1MzUyNTU2MTQzMg==';

              addLineItems([{ variantId, quantity: 1 }]);
            }}
            >
              Add Item
            </Button>

            {cartState.totalItems === 0
              ? <CartEmptyState />
              : (
                <>
                  {lineItems && lineItems.map(lineItem => (
                    <CartLineItem
                      key={lineItem.id}
                      lineItem={lineItem}
                    />
                  ))}

                  <CartTotals />
                </>
              )
            }
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
