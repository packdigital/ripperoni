/** @jsx jsx */
import { forwardRef } from 'react';
import { Box, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';

import { SvgStatic } from './SvgStatic';
import { SvgBackground } from './SvgBackground';


export const Svg = forwardRef((incomingProps, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Svg.propTypes = propTypes;

  return (
    <Box
      data-comp={Svg.displayName}
      ref={ref}
      display='block'
      sx={sxObject}
      {...props}
    />
  );
});

Svg.Static = SvgStatic;
Svg.Background = SvgBackground;
Svg.displayName = 'Svg';
