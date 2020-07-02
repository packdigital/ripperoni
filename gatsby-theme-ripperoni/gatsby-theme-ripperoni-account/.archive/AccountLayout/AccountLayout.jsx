import React, { useContext } from 'react';

import { Box, Button, Container, Flex, Heading, Link, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';
import { AccountNavigation } from  '../AccountNavigation';


export const AccountLayout = ({
  path,
  children,
  ...props
}) => {
  const { state, logout } = useContext(CustomerContext);

  return (
    <Container gutter='30px'>
      <Flex.Col {...props}>
        <Flex
          between
          top
        >
          <Box variant='layout.account.internal.userMeta'>
            <Heading>Hey {state.customer.firstName}</Heading>
            <Link href={`mailto:${state.customer.email}`}>{state.customer.email}</Link>
          </Box>

          <Button.Link
            onClick={logout}
            display={[null, null, null, 'none']}
          >
            Sign Out
          </Button.Link>
        </Flex>

        <Box variant='layout.account.internal.navigation'>
          <AccountNavigation path={path} />
        </Box>

        <Box variant='layout.account.internal.contact'>
          <Text>Need Help?</Text>
          <Link href='mailto:help@domain.com'>help@domain.com</Link>
        </Box>

        <Box variant='layout.account.internal.content'>
          {children}
        </Box>
      </Flex.Col>
    </Container>
  );
};
