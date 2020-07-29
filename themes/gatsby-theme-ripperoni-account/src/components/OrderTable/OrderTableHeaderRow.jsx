import React from 'react';

import { Box, Flex, Text } from '@ripperoni/components';


export const TableHeaderRow = props => {
  return (
    <Flex
      between
      variant='account.orders.table.headerRow'
      {...props}
    >
      <Box variant='account.orders.table.headerCell.orderNumber'>
        <Text variant='account.text.orders.table.headerCell.orderNumber'>
          Order
        </Text>
      </Box>
      <Box variant='account.orders.table.headerCell.date'>
        <Text variant='account.text.orders.table.headerCell.date'>
          Date
        </Text>
      </Box>
      <Box variant='account.orders.table.headerCell.status'>
        <Text variant='account.text.orders.table.headerCell.status'>
          Status
        </Text>
      </Box>
      <Box variant='account.orders.table.headerCell.price'>
        <Text variant='account.text.orders.table.headerCell.price'>
          Total
        </Text>
      </Box>
    </Flex>
  );
};
