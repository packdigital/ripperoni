/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Text } from '@ripperoni/components';


export const TableCell = props => {
  return (
    <Box
      data-comp={TableCell.displayName}
      variant='account.pages.orders.table.cell'
      flex={1}
    >
      <Text
        variant='account.text.orders.table.cell'
        {...props}
      >
        {props.children}
      </Text>
    </Box>
  );
};

TableCell.displayName = 'Cell';
