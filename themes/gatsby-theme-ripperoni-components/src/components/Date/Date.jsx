/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import dateformat from 'dateformat';

import { Text } from '../Text';


export const Date = forwardRef(({
  format = 'ripperoniTime',
  children,
  ...props
}, ref) => {
  return (
    <Text
      variant='date'
      data-comp={Date.displayName}
      ref={ref}
      {...props}
    >
      {dateformat(children, format)}
    </Text>
  );
});

Date.displayName = 'Date';

Date.propTypes = {
  ...Text.propTypes,
  format: PropTypes.string,
  children: PropTypes.string.isRequired
};
