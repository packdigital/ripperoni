/* eslint-disable react/prop-types */
import React from 'react';

import { Container, Grid } from '@ripperoni/components';
import { UserMeta } from  '@ripperoni/account/components/UserMeta';
import { AccountNavigation } from  '@ripperoni/account/components/AccountNavigation';
import { ContactUs } from  '@ripperoni/account/components/ContactUs';
import { PageContents } from  '@ripperoni/account/components/PageContents';


export const AccountLayout = ({
  path,
  children,
  loggedIn,
  ...props
}) => {
  return (
    <Container {...props}>
      <Container variant='account.layout.inner'>
        {loggedIn
          ? (
            <Grid variant='account.layout.grid'>
              <UserMeta gridArea='meta' />

              <AccountNavigation
                path={path}
                gridArea='navigation'
              />

              <ContactUs gridArea='contact' />

              <PageContents gridArea='contents'>
                {children}
              </PageContents>
            </Grid>
          )
          : children
        }
      </Container>
    </Container>
  );
};
