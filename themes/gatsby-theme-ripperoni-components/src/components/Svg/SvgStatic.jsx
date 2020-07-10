/** @jsx jsx */
import PropTypes from 'prop-types';
import { Box, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';


export const SvgStatic = ({
  uri,
  altTxt = 'SVG Image',
  ...incomingProps
}) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  SvgStatic.propTypes = {
    ...propTypes,
    uri: PropTypes.string.isRequired,
    altTxt: PropTypes.string.isRequired,
  };

  return (
    <Box
      data-comp={SvgStatic.displayName}
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
