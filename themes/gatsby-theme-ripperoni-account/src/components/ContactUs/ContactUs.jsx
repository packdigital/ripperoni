import React from 'react';

import { Box, Heading, Link } from '@ripperoni/components';


export const ContactUs = props => {
  return (
    <Box
      data-comp={ContactUs.displayName}
      variant='account.layout.contact'
      {...props}
    >
      <Heading variant='account.text.layout.contact.heading'>
        Need Help?
      </Heading>

      <Link
        href='mailto:help@domain.com'
        sx={{ variant: 'account.text.layout.contact.email' }}
      >
        help@domain.com
      </Link>
    </Box>
  );
};

ContactUs.displayName = 'Contact Us';
