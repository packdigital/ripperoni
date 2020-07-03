/** @jsx jsx */
import PropTypes from 'prop-types';
import { Box, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';


export const SvgStatic = ({
  uri,
  altTxt = 'SVG Image',
  ...incomingProps
}) => {
  const { sxObject, props } = useSxProps(incomingProps);

  return (
    <Box
      as='img'
      src={uri}
      alt={altTxt}
      aria-label={altTxt}
      sx={sxObject}
      {...props}
    />
  );
};

SvgStatic.displayName = 'Svg.Static';

SvgStatic.propTypes = {
  ...defaultProps.propTypes,
  uri: PropTypes.string.isRequired,
  altTxt: PropTypes.string.isRequired,
};
