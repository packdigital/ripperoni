/** @jsx jsx */
import PropTypes from 'prop-types';
import { Box, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as svgBackgroundProps from './SvgBackground.sx';


export const SvgBackground = ({
  uri,
  altTxt = 'SVG Image',
  ...incomingProps
}) => {
  const { sxObject, props } = useSxProps(incomingProps, [svgBackgroundProps]);

  return (
    <Box
      role="img"
      aria-label={altTxt}
      sx={{
        ...sxObject,
        backgroundImage: `url(${uri})`,
      }}
      {...props}
    />
  );
};

SvgBackground.displayName = 'Svg.Background';

SvgBackground.propTypes = {
  ...defaultProps.propTypes,
  uri: PropTypes.string.isRequired,
  altTxt: PropTypes.string.isRequired,
  backgroundPosition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  backgroundSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  backgroundRepeat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  backgroundAttachment: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

SvgBackground.defaultProps = {
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'inherit',
};
