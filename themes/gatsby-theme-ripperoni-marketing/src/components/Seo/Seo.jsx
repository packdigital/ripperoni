/**
 * @prettier
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { Location } from '@reach/router';

import { schemaGenerator } from './schemaGenerator';

const SeoWithQuery = ({
  name,
  description,
  url,
  pageTitle,
  pageTitleFull = pageTitle ? `${name}: ${pageTitle}` : name,
  color,
  facebook,
  twitter,
  logo,
  location,
  canonical = url + (location.pathname || ''),
}) => (
  <Helmet>
    <html lang='en' />

    <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
    <meta
      content='width=device-width,initial-scale=1.0,user-scalable=yes'
      name='viewport'
    />

    <meta content={name} name='apple-mobile-web-app-title' />
    <meta content={pageTitleFull} property='og:title' />
    <meta content={pageTitleFull} name='twitter:title' />
    <title>{pageTitleFull}</title>

    <meta content={description} name='description' />
    <meta content={description} property='og:description' />
    <meta content={description} name='twitter:description' />

    <meta content='yes' name='apple-mobile-web-app-capable' />
    <meta
      content='black-translucent'
      name='apple-mobile-web-app-status-bar-style'
    />
    <meta content={color} name='theme-color' />
    <meta content={name} name='application-name' />

    <meta content='website' property='og:type' />
    <meta content={name} property='og:site_name' />
    <meta content={facebook} property='fb:app_id' />
    <meta content='summary_large_image' name='twitter:card' />
    <meta content={`@${twitter}`} name='twitter:site' />
    <meta content={`@${twitter}`} name='twitter:creator' />
    <meta content={pageTitleFull} name='twitter:text:title' />
    <meta content={canonical} property='og:url' />
    <meta content={canonical} name='twitter:url' />
    <link rel='canonical' href={canonical} />

    <meta content={logo || `${url}/social.png`} property='og:image' />
    <meta content='1024' property='og:image:width' />
    <meta content='512' property='og:image:height' />
    <meta content={logo || `${url}/social.png`} name='twitter:image' />
    <meta content='1024' name='twitter:image:width' />
    <meta content='512' name='twitter:image:height' />
    <meta content={logo || `${url}/social.png`} property='og:image' />
    <meta content='1024' property='og:image:width' />
    <meta content='512' property='og:image:height' />

    <meta content={color} name='msapplication-TileColor' />
    <meta content='/icons/mstile-70x70.png' name='msapplication-square70x70' />
    <meta
      content='/icons/mstile-144x144.png'
      name='msapplication-square144x144'
    />
    <meta
      content='/icons/mstile-150x150.png'
      name='msapplication-square150x150'
    />
    <meta
      content='/icons/mstile-310x150.png'
      name='msapplication-wide310x150'
    />
    <meta
      content='/icons/mstile-310x310.png'
      name='msapplication-square310x310'
    />

    <script type='application/ld+json'>
      {JSON.stringify(
        schemaGenerator({
          location,
          canonical,
          url,
          pageTitle,
          name,
          pageTitleFull,
        })
      )}
    </script>
  </Helmet>
);

export const Seo = (props) => {
  const data = useStaticQuery(staticQuery);

  return (
    <Location>
      {({ location }) => (
        <SeoWithQuery
          {...data.site.siteMetadata.site}
          {...data.site.siteMetadata.social}
          {...props}
          location={location}
        />
      )}
    </Location>
  );
};

SeoWithQuery.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  color: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  logo: PropTypes.string,
  canonical: PropTypes.string,
  pageTitle: PropTypes.string,
  pageTitleFull: PropTypes.string,
  location: PropTypes.object.isRequired,
};

const staticQuery = graphql`
  query {
    site {
      siteMetadata {
        site {
          url
          name
          description
          color
          logo
        }
        social {
          facebook
          twitter
        }
      }
    }
  }
`;
