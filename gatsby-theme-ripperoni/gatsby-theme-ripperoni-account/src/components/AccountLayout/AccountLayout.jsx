import React, { useContext } from 'react';

import { Box, Flex, Heading, Link, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';
import { AccountNavigation } from  '../AccountNavigation';


export const AccountLayout = ({
  path,
  children,
  ...props
}) => {
  const { state } = useContext(CustomerContext);

  return (
    <Flex.Col variant='layout.account'>
      <Box className='account-layout-user-meta'>
        <Heading>Hey {state.customer.firstName}</Heading>
        <Link href={`mailto:${state.customer.email}`}>{state.customer.email}</Link>
      </Box>

      <Box className='account-layout-navigation'>
        <AccountNavigation path={path} />
      </Box>

      <Box className='account-layout-contact'>
        <Text>Need Help?</Text>
        <Link href='mailto:help@domain.com'>help@domain.com</Link>
      </Box>

      <Box className='account-layout-content'>
        {children}
      </Box>
    </Flex.Col>
  );
};
