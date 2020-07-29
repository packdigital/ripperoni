/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Heading as HeadingUI, jsx } from 'theme-ui';

import { useSxProps } from '@ripperoni/components/hooks/useSxProps';

import HeadingSx from './Heading.sx';


export const Heading = forwardRef(({
  text,
  children,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps, HeadingSx);

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
