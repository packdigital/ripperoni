import React from 'react';

import { Box, Text } from '@ripperoni/components';


export const Address = ({ address, ...props }) => (
  <Box {...props}>
    <Text>
      {`${address.firstName} ${address.lastName}`}
    </Text>

    <Text>
      {address.address1}
    </Text>

    {address.address2 && (
      <Text>
        {address.address2}
      </Text>
    )}

    {address.company && (
      <Text>
        {address.company}
      </Text>
    )}

    <Text>
      {`${address.city}, ${address.provinceCode} ${address.zip}`}
    </Text>

    <Text>
      {`${address.country}`}
    </Text>
  </Box>
);
