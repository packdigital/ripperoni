/**
 * @prettier
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { Container, Grid } from '@ripperoni/components';

import { UserMeta } from '../../components/UserMeta';
import { AccountNavigation } from '../../components/AccountNavigation';
import { ContactUs } from '../../components/ContactUs';
import { PageContents } from '../../components/PageContents';

export const AccountLayout = ({ path, children, loggedIn, ...props }) => {
  return (
    <Container data-comp='Account Layout' {...props}>
      <Container
        data-comp='Account Layout Inner'
        variant='account.layout.inner'
      >
        {loggedIn ? (
          <Grid data-comp='Account Layout Grid' variant='account.layout.grid'>
            <UserMeta data-comp='Account Layout User Meta' gridArea='meta' />

            <AccountNavigation
              data-comp='Account Layout Navigation'
              path={path}
              gridArea='navigation'
            />

            <ContactUs data-comp='Account Layout Contact' gridArea='contact' />

            <PageContents
              data-comp='Account Layout Page Contents'
              gridArea='contents'
            >
              {children}
            </PageContents>
          </Grid>
        ) : (
          children
        )}
      </Container>
    </Container>
  );
};
