/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Heading as HeadingUI, jsx } from 'theme-ui';

import { useSxProps } from '@ripperoni/components/hooks/useSxProps';

import { H1 } from './H1';
import { H2 } from './H2';
import { H3 } from './H3';
import { H4 } from './H4';
import { H5 } from './H5';
import { H6 } from './H6';
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

Heading.H1 = H1;
Heading.H2 = H2;
Heading.H3 = H3;
Heading.H4 = H4;
Heading.H5 = H5;
Heading.H6 = H6;
Heading.Display = Display;
Heading.displayName = 'Heading';
