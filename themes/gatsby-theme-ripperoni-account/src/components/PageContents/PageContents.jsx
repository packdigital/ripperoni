/* eslint-disable react/prop-types */
import React from 'react';

import { Box } from '@ripperoni/components';


export const PageContents = props => {
  return (
    <Box
      variant='account.layout.contents'
      {...props}
    >
      {props.children}
    </Box>
  );
};
