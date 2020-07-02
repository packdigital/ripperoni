import React from 'react';

import { Box, Heading, Link } from '@packdigital/gatsby-theme-ripperoni-components/src/components';


export const ContactUs = props => {
  return (
    <Box {...props}>
      <Heading variant='text.account.contact.heading'>
        Need Help?
      </Heading>

      <Link
        href='mailto:help@domain.com'
        sx={{ variant: 'text.account.contact.email' }}
      >
        help@domain.com
      </Link>
    </Box>
  );
};
