/** @jsx jsx */
import { forwardRef, useRef, useState } from 'react';
import { Box, Image as ImageUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import { ImageSharp } from './ImageSharp';
import { ImageContentful } from './ImageContentful';


export const Image = forwardRef(({
  src = 'https://via.placeholder.com/800',
  altTxt = 'An image',
  imgStyle = {},
  imgClassName = '',
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
    <Box
      id={lazyImageId.current}
      ref={localRef}
      data-comp={Image.displayName}
      {...props}
    >
      {isVisible && (
        <ImageUI
          ref={ref}
          src={src}
          alt={altTxt}
          className={['image', imgClassName].join(' ')}
          css={{
            width: '100%',
            maxWidth: '100%',
            'display': 'block',
            ...imgStyle
          }}
        />
    )}
    </Box>
  );
});

Image.displayName = 'LazyImage';

Image.Lazy = Image;
Image.Sharp = ImageSharp;
Image.Contentful = ImageContentful;

Image.propTypes = {
  altTxt: PropTypes.string.isRequired,
  imgStyle: PropTypes.object,
  imgClassName: PropTypes.string,
  src: PropTypes.string.isRequired,
};
