/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import { graphql, useStaticQuery } from 'gatsby';

import { Text } from '../Text';


export const Price = forwardRef(({
  cents,
  children,
  ...props
}, ref) => {
  const { site: { meta: { format }}} = useStaticQuery(staticQuery);
  let price = children;

  if (typeof(price) === 'string') {
    price = parseFloat(price);
  }

  if (cents) {
    price = price / 100;
  }

  price = price.toFixed(2);

  if (format.money.trimTralingZeros) {
    price = price.replace('.00', '');
  }

  if (isNaN(price)) {
    price = children;
  } else {
    price = format.money.string.replace('{price}', price);
  }

  return (
    <Text
      variant='price'
      data-comp={Price.displayName}
      ref={ref}
      {...props}
    >
      {price}
    </Text>
  );
});

Price.displayName = 'Text';


Price.propTypes = {
  ...Text.propTypes,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
};

const staticQuery = graphql`
  {
    site {
      meta: siteMetadata {
        format {
          money {
            string
            trimTralingZeros
          }
        }
      }
    }
  }
`;
