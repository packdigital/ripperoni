/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Heading as HeadingUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import { h1 } from './H1';
import { h2 } from './H2';
import { h3 } from './H3';
import { h4 } from './H4';
import { h5 } from './H5';
import { h6 } from './H6';
import { Display } from './Display';
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

Heading.h1 = h1;
Heading.h2 = h2;
Heading.h3 = h3;
Heading.h4 = h4;
Heading.h5 = h5;
Heading.h6 = h6;
Heading.Display = Display;
Heading.displayName = 'Heading';
