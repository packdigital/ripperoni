/** @jsx jsx */
import React from 'react';
import { Container, Heading, jsx } from 'theme-ui';

import { FlexCol, FlexMQ } from '@theme2/components';

import { AccountNavigation } from '@components/Account/AccountNavigation';


export const AccountLayout = ({ children, ...props }) => {
  return (
    <React.Fragment>
      <Heading
        variant='text.heading.display'
        sx={{
          py: 12,
          bg: 'black',
          color: 'white',
          textAlign: 'center',
        }}
      >
        My Account
      </Heading>

      <Container
        variant='layout.containedWithGutter'
        py={['50px', null, null, null, '100px']}
      >
        <FlexMQ direction={['col', null, null, null, 'row']}>
          <AccountNavigation
            path={props.path}
            sx={{
              width: '100%',
              flex: [1, null, null, null, 3],
              mr: [null, null, null, null, '65px'],
            }}
          />

          <FlexCol
            sx={{
              width: '100%',
              flex: [1, null, null, null, 9],
            }}
          >
            {children}
          </FlexCol>
        </FlexMQ>
      </Container>
    </React.Fragment>
  );
};

export default AccountLayout;
