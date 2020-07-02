import React from 'react';

import { Box } from '@ripperoni/components';


export const LoggedInPage = props => {
  return (
    <Box {...props}>
      {props.children}
    </Box>
  );
};
