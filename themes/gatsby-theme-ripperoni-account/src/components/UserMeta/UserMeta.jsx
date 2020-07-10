import React from 'react';

import { Box, Button, Flex, Heading, Link } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';


export const UserMeta = props => {
  const { state, logout } = useCustomerContext();

  return (
    <Flex
      variant='account.layout.meta'
      between
      top
      {...props}
    >
      <Box variant='account.layout.meta.content'>
        <Heading variant='account.text.layout.meta.heading'>
          Hey {state.customer.firstName}
        </Heading>

        <Link
          href={`mailto:${state.customer.email}`}
          sx={{ variant: 'account.text.layout.meta.email' }}
        >
          {state.customer.email}
        </Link>
      </Box>

      <Button.Link
        onClick={logout}
        display={[null, null, null, 'none']}
      >
        Sign Out
      </Button.Link>
    </Flex>
  );
};
