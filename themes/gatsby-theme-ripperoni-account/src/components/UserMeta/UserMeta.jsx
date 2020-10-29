import React from 'react';

import { Box, Button, Flex, Heading, Text } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';

export const UserMeta = (props) => {
  const { state, logoutCustomer } = useCustomerContext();

  return (
    <Flex variant='account.layout.meta' between top {...props}>
      <Box variant='account.layout.meta.content'>
        <Heading variant='account.text.layout.meta.heading'>
          Hey {state.customer.firstName}
        </Heading>

        <Text variant='account.text.layout.meta.email'>
          {state.customer.email}
        </Text>
      </Box>

      <Button.Link
        onClick={logoutCustomer}
        display={[null, null, null, 'none']}
      >
        Sign Out
      </Button.Link>
    </Flex>
  );
};
