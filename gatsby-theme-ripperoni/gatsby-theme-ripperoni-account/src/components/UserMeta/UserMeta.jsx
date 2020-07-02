import React, { useContext } from 'react';

import { Box, Button, Flex, Heading, Link } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';


export const UserMeta = props => {
  const { state, logout } = useContext(CustomerContext);

  return (
    <Flex
      between
      top
      {...props}
    >
      <Box>
        <Heading variant='text.account.meta.heading'>
          Hey {state.customer.firstName}
        </Heading>

        <Link
          href={`mailto:${state.customer.email}`}
          sx={{ variant: 'text.account.meta.email' }}
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
