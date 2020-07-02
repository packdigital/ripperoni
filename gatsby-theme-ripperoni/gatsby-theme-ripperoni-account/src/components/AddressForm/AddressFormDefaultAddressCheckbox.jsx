import React from 'react';
import { Checkbox, Label } from 'theme-ui';

import { Box } from '@ripperoni/components';


export const DefaultAddressCheckbox = ({
  defaultChecked,
  ...props
}) => (
  <Box {...props}>
    <Label>
      <Checkbox
        name='default'
        defaultChecked={defaultChecked}
        {...props}
      />
      Make Default
    </Label>
  </Box>
);
