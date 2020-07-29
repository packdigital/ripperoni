import React from 'react';
import PropTypes from 'prop-types';

import Arrow from '@ripperoni/account/assets/images/arrow.svg';
import { Date, Flex, Heading, Link, Svg } from '@ripperoni/components';


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
