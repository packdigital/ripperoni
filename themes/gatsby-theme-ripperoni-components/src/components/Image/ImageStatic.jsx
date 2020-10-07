/** @jsx jsx */
import { forwardRef } from 'react';
import { Image as ImageUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { useSxProps } from '../../hooks/useSxProps';


export const ImageStatic = forwardRef(({
  src,
  altTxt,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  ImageStatic.propTypes = {
    ...propTypes,
    src: PropTypes.string.isRequired,
    altTxt: PropTypes.string.isRequired,
    fluid: PropTypes.any,
    // fluid: PropTypes.oneOfType([
    //   PropTypes.object,
    //   PropTypes.arrayOf(PropTypes.object)
    // ]),
  };

  return (
    <ImageUI
      data-comp={ImageStatic.displayName}
      ref={ref}
      src={src}
      alt={altTxt}
      sx={sxObject}
      {...props}
    />
  );
});

ImageStatic.displayName = 'Static Image';

ImageStatic.defaultProps = {
  src: 'https://via.placeholder.com/800',
  altTxt: 'An image',
};
