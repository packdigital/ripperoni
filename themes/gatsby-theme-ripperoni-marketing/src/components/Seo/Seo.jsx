import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';


export const Seo = props => {
  const result = useStaticQuery(staticQuery);
  const { site, seo } = result.site.metadata;

  const title = seo.title || site.name;
  const author = seo.author || site.author;
  const description = seo.description || site.description;

  return (
    <Helmet
      htmlAttributes={{ lang: props.lang }}
      title={props.title}
      titleTemplate={`%s | ${title}`}
      meta={[
        {
          name: 'title',
          content: props.title || title,
        },
        {
          name: 'description',
          content: props.description || description,
        },
        {
          property: 'og:title',
          content: props.title,
        },
        {
          property: 'og:description',
          content: props.description || description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: author,
        },
        {
          name: 'twitter:title',
          content: props.title,
        },
        {
          name: 'twitter:description',
          content: props.description || description,
        },
      ].concat(props.meta)}
    />
  );
};

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  description: PropTypes.string,
};

Seo.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
};


const staticQuery = graphql`
  {
    site {
      metadata: siteMetadata {
        site {
          name
          author
          description
        }
        seo {
          title
          author
          description
        }
      }
    }
  }
`;
