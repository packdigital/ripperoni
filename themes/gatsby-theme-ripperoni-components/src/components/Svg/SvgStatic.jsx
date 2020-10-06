/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';


export const SvgStatic = forwardRef(({
  uri,
  altTxt = 'SVG Image',
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  SvgStatic.propTypes = {
    ...propTypes,
    uri: PropTypes.string.isRequired,
    altTxt: PropTypes.string.isRequired,
  };

  return (
    <Box
      data-comp={SvgStatic.displayName}
      ref={ref}
      as='img'
      src={uri}
      alt={altTxt}
      aria-label={altTxt}
      sx={sxObject}
      {...props}
    />
  );
});

SvgStatic.displayName = 'Svg.Static';
