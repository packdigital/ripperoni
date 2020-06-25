/* eslint-disable import/no-default-export */
/** @jsx jsx */
import React from 'react';
import { Divider as DividerUI, jsx, useThemeUI } from 'theme-ui';

import { Button, Flex, Heading, Link, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';


const IndexPage = props => {
  const { theme } = useThemeUI();

  const Divider = () => (
    <DividerUI
      color='black'
      sx={{
        my: 5,
        width: '100%',
      }}
    />
  );

  return (
    <>
      <Flex.Col
        width='100%'
        right
        around
        wrap
      >
        <Heading>Homepage</Heading>
        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
        <div>bye!</div>

        <Divider />

        <Button>Button</Button>

        <Divider />

        <Button.Link>Button Link</Button.Link>

        <Divider />

        <Link>Link</Link>

        <Divider />

        <Link.Button>LinkButton</Link.Button>

        <Divider />

        <Link.Button variant='buttons.secondary'>LinkButton</Link.Button>
      </Flex.Col>
    </>
  );
};

export default IndexPage;
