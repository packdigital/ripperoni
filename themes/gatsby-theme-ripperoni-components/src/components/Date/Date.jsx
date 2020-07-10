/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import dateformat from 'dateformat';
import { graphql, useStaticQuery } from 'gatsby';

import { Text } from '../Text';


export const Date = forwardRef(({
  format,
  children,
  ...props
}, ref) => {
  const result = useStaticQuery(staticQuery);
  const { format: defaultFormat } = result.site.metadata.date;

  return (
    <Text
      data-comp={Date.displayName}
      variant='date'
      ref={ref}
      {...props}
    >
      {dateformat(children, format || defaultFormat)}
    </Text>
  );
});

Date.displayName = 'Date';

Date.propTypes = {
  ...Text.propTypes,
  format: PropTypes.string,
  children: PropTypes.string.isRequired,
};

const staticQuery = graphql`
  {
    site {
      metadata: siteMetadata {
        date {
          format
        }
      }
    }
  }
`;
