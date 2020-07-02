import React from 'react';

import { Box } from '@packdigital/gatsby-theme-ripperoni-components/src/components';


export const LoggedInPage = props => {
  return (
    <Box {...props}>
      {props.children}
    </Box>
  );
};
