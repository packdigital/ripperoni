/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import { graphql, useStaticQuery } from 'gatsby';

import { Text } from '../Text';


export const Price = forwardRef(({
  cents,
  children = '',
  format: formatOverride,
  trimTrailingZeros: trimTrailingZerosOverride,
  ...props
}, ref) => {
  const { site: { metadata: { money }}} = useStaticQuery(staticQuery);
  const format = formatOverride || money.format;
  const trimTrailingZeros = trimTrailingZerosOverride || money.trimTrailingZeros;

  let price = children;

  if (typeof(price) === 'string') {
    price = parseFloat(price);
  }

  if (cents) {
    price = price / 100;
  }

  price = price.toFixed(2);

  if (trimTrailingZeros) {
    price = price.replace('.00', '');
  }

  if (isNaN(price)) {
    price = children;
  } else {
    price = format.replace('{price}', price);
  }

  return (
    <Text
      data-comp={Price.displayName}
      variant='price'
      ref={ref}
      {...props}
    >
      {price}
    </Text>
  );
});

Price.displayName = 'Price';

Price.propTypes = {
  ...Text.propTypes,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

const staticQuery = graphql`
  {
    site {
      metadata: siteMetadata {
        money {
          format
          trimTrailingZeros
        }
      }
    }
  }
`;
