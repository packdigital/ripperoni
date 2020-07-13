import React from 'react';

import { Box, Flex, Text } from '@ripperoni/components';


export const TableHeaderRow = props => {
  return (
    <Flex
      between
      variant='account.pages.orders.table.headerRow'
      {...props}
    >
      <Box variant='account.pages.orders.table.headerRow.cell'>
        <Text variant='account.text.orders.table.headerRow.cell'>
          Order
        </Text>
      </Box>
      <Box variant='account.pages.orders.table.headerRow.cell'>
        <Text variant='account.text.orders.table.headerRow.cell'>
          Date
        </Text>
      </Box>
      <Box variant='account.pages.orders.table.headerRow.cell'>
        <Text variant='account.text.orders.table.headerRow.cell'>
          Status
        </Text>
      </Box>
      <Box variant='account.pages.orders.table.headerRow.cell'>
        <Text variant='account.text.orders.table.headerRow.cell'>
          Total
        </Text>
      </Box>
    </Flex>
  );
};
