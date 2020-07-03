/** @jsx jsx */
import { Box, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import { SvgStatic } from './SvgStatic';
import { SvgBackground } from './SvgBackground';


export const Svg = incomingProps => {
  const { sxObject, props } = useSxProps(incomingProps);

  return (
    <Box
      sx={sxObject}
      {...props}
    />
  );
};

Svg.displayName = 'Svg';

Svg.Static = SvgStatic;
Svg.Background = SvgBackground;

Svg.propTypes = {
  ...defaultProps.propTypes,
};
