/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Text as TextUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import TextSx from './Text.sx';


export const Text = forwardRef(({
  children,
  text,
  longText = {},
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps, TextSx);

  Text.propTypes = {
    ...propTypes,
    text: PropTypes.any,
    longText: PropTypes.shape({
      text: PropTypes.string
    }),
    children: PropTypes.any,
  };

  return (
    <TextUI
      data-comp={Text.displayName}
      ref={ref}
      sx={sxObject}
      {...props}
    >
      {children || text || longText?.text}
    </TextUI>
  );
});

Text.displayName = 'Text';
