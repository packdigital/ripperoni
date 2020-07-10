/** @jsx jsx */
import PropTypes from 'prop-types';
import { Box, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';


export const SvgBackground = ({
  uri,
  altTxt = 'SVG Image',
  ...incomingProps
}) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  SvgBackground.propTypes = {
    ...propTypes,
    uri: PropTypes.string.isRequired,
    altTxt: PropTypes.string.isRequired,
  };

  return (
    <Box
      data-comp={SvgBackground.displayName}
      role='img'
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

SvgBackground.defaultProps = {
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'inherit',
};
