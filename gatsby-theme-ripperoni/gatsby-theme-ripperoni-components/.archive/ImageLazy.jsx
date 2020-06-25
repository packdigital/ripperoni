/** @jsx jsx */
import { Box, jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import React, { forwardRef, useRef, useState } from 'react';
import uniqueid from 'lodash.uniqueid';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';


export const LazyImage = forwardRef(({
  css = {},
  sx = {},
  src = 'https://via.placeholder.com/800',
  className = '',
  width = ['100%'],
  height = ['100%'],
  altTxt = 'image title',
  ...props
}, ref ) => {
  const localRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const lazyImageId = useRef(uniqueid('lazy-image-'));

  useIntersectionObserver({
    target: localRef,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(localRef.current);
      }
    }
  });

  return (
    <div
      id={lazyImageId.current}
      ref={localRef}
      data-comp={LazyImage.displayName}
      className={['image-container', className].join(' ')}
      css={{
        height: '100%',
        width: '100%',
        'img': {
          height: height ? height : 'unset'
        }
      }}
    >
      {isVisible && (
        <img
          ref={ref}
          {...props}
          alt={altTxt}
          className={['image', className].join(' ')}
          src={src}
          css={{
            ...css,
          }}
          sx={{
            ...sx,
            'display': 'block',
            height,
            width,
            maxWidth: '100%',
          }}
        />
    )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

LazyImage.propTypes = {
  css: PropTypes.object,
  altTxt: PropTypes.string.isRequired,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  sx: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
  ]),
};
