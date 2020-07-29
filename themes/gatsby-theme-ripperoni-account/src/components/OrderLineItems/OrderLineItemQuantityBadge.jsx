import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from '@ripperoni/components';


export const QuantityBadge = ({
  children,
  ...props
}) => {
  return (
    <Flex
      data-comp={QuantityBadge.displayName}
      variant='account.order.lineItem.badge'
      center
      middle
      width='24px'
      height='24px'
      position='absolute'
      right={0}
      translate='50%, -50%'
      {...props}
    >
      {children}
    </Flex>
  );
};

QuantityBadge.displayName = 'Quantity Badge';

QuantityBadge.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
