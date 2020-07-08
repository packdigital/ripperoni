import React from 'react';

import { Date, Flex, Heading, Link, Svg } from '@ripperoni/components';

import Arrow from '../../assets/images/arrow.svg';


export const OrderHeader = ({
  order,
  ...props
}) => {
  return (
    <Flex
      between
      middle
      variant='pages.account.order.header'
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

          <Heading variant='text.account.order.heading'>
            {`Order #${order.id}`}
          </Heading>
        </Flex>
      </Link>

      <Date
        variant='text.account.order.date'
        format='ddd, mmm dS, yyyy'
      >
        {order.date}
      </Date>
    </Flex>
  );
};
