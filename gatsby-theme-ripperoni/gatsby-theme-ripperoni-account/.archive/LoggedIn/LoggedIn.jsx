import React from 'react';

import { Container, Flex } from '@ripperoni/components';

import { UserMeta } from  '../../components/UserMeta';
import { AccountNavigation } from  '../../components/AccountNavigation';
import { ContactUs } from  '../../components/ContactUs';
import { LoggedInPage } from  '../../components/LoggedInPage';


export const LoggedIn = ({
  path,
  children,
}) => {
  return (
    <Container.Full variant='layout.account.loggedIn.outer'>
      <Container variant='layout.account.loggedIn.inner'>
        <Flex.Col
          wrap={['nowrap', null, null, 'wrap']}
          height='100vh'
        >
          <UserMeta />

          <AccountNavigation
            path={path}
            width={[null, null, null, '25%']}
          />

          <ContactUs order={[1, null, null, 'initial']} />

          <LoggedInPage
            width={[null, null, null, '75%']}
            flexBasis={[null, null, null, '100%']}
          >
            {children}
          </LoggedInPage>
        </Flex.Col>
      </Container>
    </Container.Full>
  );
};
