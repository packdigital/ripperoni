import React from 'react';

import { Button, Flex, Heading, Svg } from '@ripperoni/components';
import { useUIContext } from '@ripperoni/core/context/UIContext';
import Arrow from '@ripperoni/cart/assets/images/arrow.svg';


export const CartHeader = props => {
  const { toggleCart } = useUIContext();

  return (
    <Flex
      p='22px'
      borderBottom='default'
      {...props}
    >
      <Button.Plain
        mr='12px'
        onClick={toggleCart}
      >
        <Svg
          as={Arrow}
          height='15px'
          width='15px'
        />
      </Button.Plain>

      <Heading>Your Shoping Cart</Heading>
    </Flex>
  );
};
