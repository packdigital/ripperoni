import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Box, Heading, Link } from '@ripperoni/components';


export const ContactUs = props => {
  const result = useStaticQuery(staticQuery);
  const { supportEmail } = result.site.siteMetadata.site;

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
        href={`mailto:${supportEmail}`}
        sx={{ variant: 'account.text.layout.contact.email' }}
      >
        {supportEmail}
      </Link>
    </Box>
  );
};

ContactUs.displayName = 'Contact Us';

const staticQuery = graphql`
  {
    site {
      siteMetadata {
        site {
          supportEmail
        }
      }
    }
  }
`;
