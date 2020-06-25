import React, { useContext } from 'react';

import { Box, Flex, Heading, Link, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';
import { AccountNavigation } from  '../AccountNavigation';


export const AccountLayout = ({
  path,
  children,
  ...props
}) => {
  const { customer } = useContext(CustomerContext);

  return (
    <Flex.Col>
      <Box>
        <Heading>Hey {customer.firstName}</Heading>
        <Link href={`mailto:${customer.email}`}>{customer.email}</Link>
      </Box>

      <Box>
        <AccountNavigation path={path} />
      </Box>

      <Box>
        <Text>Need Help?</Text>
        <Link href='mailto:help@domain.com'>help@domain.com</Link>
      </Box>

      <Box>
        {children}
      </Box>
    </Flex.Col>
  );
};
