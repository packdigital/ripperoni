import React from 'react';
import { Input } from 'theme-ui';


export const ZipInput = props => (
  <Input
    pattern='\d{5}'
    maxlength='5'
    {...props}
  />
);
