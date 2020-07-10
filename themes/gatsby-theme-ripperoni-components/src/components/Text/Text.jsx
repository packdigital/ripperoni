/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Text as TextUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';


export const Text = forwardRef(({
  text,
  children,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Text.propTypes = {
    ...propTypes,
    text: PropTypes.any,
    children: PropTypes.any,
  };

  return (
    <TextUI
      ref={ref}
      data-comp={Text.displayName}
      sx={sxObject}
      {...props}
    >
      {children || text}
    </TextUI>
  );
});

Text.displayName = 'Text';
