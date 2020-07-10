import React from 'react';
import PropTypes from 'prop-types';

import { Date, Flex, Link, Price } from '@ripperoni/components';

import { TableCell } from './OrderTableCell';


export const TableRow = ({
  order,
  ...props
}) => {
  return (
    <Flex
      data-comp={TableRow.displayName}
      variant='account.pages.orders.table.row'
      between
      {...props}
    >
      <TableCell>
        <Link
          to={`/account/orders/${order.id}`}
          state={{ order }}
          animate={false}
          sx={{ variant: 'account.text.orders.table.cell.orderNumber' }}
        >
          #{order.id}
        </Link>
      </TableCell>

      <TableCell as={Date}>
        {order.date}
      </TableCell>

      <TableCell>
        {order.status.toLowerCase()}
      </TableCell>

      <TableCell as={Price}>
        {order.totalPrice.amount}
      </TableCell>
    </Flex>
  );
};

TableRow.displayName = 'Table Row';

TableRow.propTypes = {
  order: PropTypes.object,
};
