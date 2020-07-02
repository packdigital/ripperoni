import React from 'react';

import { Container } from '@packdigital/gatsby-theme-ripperoni-components/src/components';


export const LoggedOut = ({ children }) => {
  return (
    <Container.Full variant='layout.account.loggedOut.outer'>
      <Container variant='layout.account.loggedOut.inner'>
        {children}
      </Container>
    </Container.Full>
  );
};
