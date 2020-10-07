import React from 'react';
import PropTypes from 'prop-types';

import { Date, Flex, Heading, Link, Svg } from '@ripperoni/components';

import Arrow from '../../assets/arrow.svg';


export const OrderHeader = ({
  order,
  ...props
}) => {
  return (
    <Flex
      data-comp={OrderHeader.displayName}
      variant='account.order.header'
      between
      middle
      {...props}
    >
      <Link
        to='/account/'
        animate={false}
      >
        <Flex>
          <Svg
            as={Arrow}
            mr='5px'
            width='15px'
          />

          <Heading variant='account.text.order.header.heading'>
            {`Order #${order.id}`}
          </Heading>
        </Flex>
      </Link>

      <Date
        variant='account.text.order.header.date'
        format='ddd, mmm dS, yyyy'
      >
        {order.date}
      </Date>
    </Flex>
  );
};

OrderHeader.displayName = 'OrderHeader';

OrderHeader.propTypes = {
  order: PropTypes.object,
};
