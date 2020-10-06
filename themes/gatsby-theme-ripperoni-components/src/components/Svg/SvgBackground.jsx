/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';


export const SvgBackground = forwardRef(({
  uri,
  altTxt = 'SVG Image',
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  SvgBackground.propTypes = {
    ...propTypes,
    uri: PropTypes.string.isRequired,
    altTxt: PropTypes.string.isRequired,
  };

  return (
    <Box
      data-comp={SvgBackground.displayName}
      ref={ref}
      role='img'
      aria-label={altTxt}
      sx={{
        ...sxObject,
        backgroundImage: `url(${uri})`,
      }}
      {...props}
    />
  );
});

SvgBackground.displayName = 'Svg.Background';

SvgBackground.defaultProps = {
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'inherit',
};
