/** @jsx jsx */
import React from 'react';
import { Box, Heading, jsx } from 'theme-ui';

import { titleCase } from '@utils';

import { FlexCol, FlexRow } from '@theme2/components';

import Link from '@theme/components/Link';
import useGlobal from '@theme/store';

import Price from '@components/Price';
import { AccountLayout } from '@components/Account/AccountLayout';


export const AccountOrders = props => {
  const [{ customer }] = useGlobal();

  return (
    <AccountLayout {...props}>
      <Heading mb={7}>Order History</Heading>

      <FlexCol
        p='25px'
        bg='white'
      >
        <FlexRow
          sx={{
            borderBottom: '1px solid lightgray',
          }}
        >
          <Cell color='darkgray'>Order</Cell>
          <Cell color='darkgray'>Date</Cell>
          <Cell color='darkgray'>Status</Cell>
          <Cell color='darkgray'>Total</Cell>
        </FlexRow>

        {customer.orders?.map(order => (
          <FlexRow key={order.id}>
            <Cell>
              <Link
                to={`/account/orders/${order.id}`}
                sx={{ textDecoration: 'underline' }}
                state={{ order }}
              >
                #{order.id}
              </Link>
            </Cell>
            <Cell>{new Date(order.date).toLocaleDateString().replace(/\//g, '-')}</Cell>
            <Cell>{titleCase(order.status)}</Cell>
            <Cell>
              <Price>{order.totalPrice.amount}</Price>
            </Cell>
          </FlexRow>
        ))}
      </FlexCol>
    </AccountLayout>
  );
};

export default AccountOrders;

const Cell = props => (
  <Box
    sx={{
      flex: 1,
      px: '5px',
      py: '15px',
      fontSize: [1],
      fontWeight: 'bold',
      letterSpacing: '1px',
      textTransform: 'capitalize',
    }}
    {...props}
  >
    {props.children}
  </Box>
);
