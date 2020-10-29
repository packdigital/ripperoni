import React from 'react';

import { useUIContext } from '@ripperoni/core';
import { Button, Flex, Heading, Svg } from '@ripperoni/components';

import Arrow from '../../assets/images/arrow.svg';

export const CartHeader = (props) => {
  const { toggleCart } = useUIContext();

  return (
    <Flex
      data-comp={CartHeader.displayName}
      p='22px'
      borderBottom='default'
      borderColor='gray.1'
      {...props}
    >
      <Button.Plain mr='12px' onClick={toggleCart}>
        <Svg as={Arrow} height='15px' width='15px' />
      </Button.Plain>

      <Heading>Your Shopping Cart</Heading>
    </Flex>
  );
};

CartHeader.displayName = 'Cart Header';
