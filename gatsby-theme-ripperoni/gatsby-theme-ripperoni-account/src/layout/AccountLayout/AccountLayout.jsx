import React from 'react';

import { Container, Grid } from '@ripperoni/components';

import { UserMeta } from  '../../components/UserMeta';
import { AccountNavigation } from  '../../components/AccountNavigation';
import { ContactUs } from  '../../components/ContactUs';
import { LoggedInPage } from  '../../components/LoggedInPage';


export const AccountLayout = ({
  path,
  children,
  loggedIn,
  ...props
}) => {
  return (
    <Container variant='layout.account.outer'>
      <Container
        variant='layout.account.inner'
        {...props}
      >
        {loggedIn
          ? (
            <Grid
              variant='layout.account.content'
              columns={['auto', null, null, '1fr 3fr']}
              rows={[null, null, null, 'repeat(2, max-content)']}
              areas={[
                `'meta'
                 'navigation'
                 'content'
                 'contact'`
                ,
                null,
                null,
                `'meta content'
                 'navigation content'
                 'contact content'`
              ]}
            >
              <UserMeta gridArea='meta' />

              <AccountNavigation
                path={path}
                gridArea='navigation'
              />

              <ContactUs
                gridArea='contact'
                justifySelf={['center', null, null, 'flex-start']}
              />

              <LoggedInPage gridArea='content'>
                {children}
              </LoggedInPage>
            </Grid>
          )
          : children
        }
      </Container>
    </Container>
  );
};
