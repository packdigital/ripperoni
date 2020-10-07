/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image/withIEPolyfill';
// import { mutuallyExclusiveProps } from 'airbnb-prop-types';


export const ImageSharp = forwardRef((props, ref) => {
  return (
    <GatsbyImage
      data-comp={ImageSharp.displayName}
      ref={ref}
      {...props}
    />
  );
});

ImageSharp.displayName = 'Sharp Image';

ImageSharp.propTypes = {
  // fixed: mutuallyExclusiveProps(PropTypes.object, 'fluid'),
  // fluid: mutuallyExclusiveProps(PropTypes.object, 'fixed'),
  fixed: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  fluid: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  fadeIn: PropTypes.bool,
  durationFadeIn: PropTypes.number,
  title: PropTypes.string,
  alt: PropTypes.string,
  crossOrigin: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  style: PropTypes.object,
  imgStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  placeholderClassName: PropTypes.string,
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onLoad: PropTypes.func,
  onStartLoad: PropTypes.func,
  onError: PropTypes.func,
  Tag: PropTypes.string,
  objectFit: PropTypes.string,
  objectPosition: PropTypes.string,
  loading: PropTypes.string,
  critical: PropTypes.bool,
  draggable: PropTypes.bool,
  itemProp: PropTypes.string,
};
