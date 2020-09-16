import React from 'react';
import { Input } from 'theme-ui';


export const PhoneInput = props => (
  <Input
    // pattern='[\d\s\.\-\+\(\)]'
    // pattern='[\d\s\.\-\+\(\)]{10,}'
    // minlength='10'
    {...props}
  />
);
