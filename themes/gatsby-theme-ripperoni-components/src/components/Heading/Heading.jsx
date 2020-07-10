/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Heading as HeadingUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';


export const Heading = forwardRef(({
  text,
  children,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Heading.propTypes = {
    ...propTypes,
    text: PropTypes.any,
    children: PropTypes.any,
  };

  return (
    <HeadingUI
      data-comp={Heading.displayName}
      ref={ref}
      sx={sxObject}
      {...props}
    >
      {children || text}
    </HeadingUI>
  );
});

Heading.displayName = 'Heading';
