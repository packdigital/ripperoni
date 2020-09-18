import React from 'react';
import PropTypes from 'prop-types';

import { Box, Date, Flex, Link, Price, Text } from '@ripperoni/components';


export const TableRow = ({
  order,
  ...props
}) => {
  return (
    <Flex
      data-comp={TableRow.displayName}
      variant='account.orders.table.row'
      between
      {...props}
    >
      <Box variant='account.orders.table.cell.orderNumber'>
        <Link
          to={`/account/orders/${order.orderNumber}`}
          state={{ order }}
          sx={{ variant: 'account.text.orders.table.cell.orderNumber' }}
        >
          {order.name}
        </Link>
      </Box>

      <Box variant='account.orders.table.cell.date'>
        <Date variant='account.text.orders.table.cell.date'>
          {order.date}
        </Date>
      </Box>

      <Box variant='account.orders.table.cell.status'>
        <Text variant='account.text.orders.table.cell.status'>
          {order.status.toLowerCase()}
        </Text>
      </Box>

      <Box variant='account.orders.table.cell.price'>
        <Price variant='account.text.orders.table.cell.price'>
          {order.totalPrice.amount}
        </Price>
      </Box>
    </Flex>
  );
};

TableRow.displayName = 'Table Row';

TableRow.propTypes = {
  order: PropTypes.object,
};
