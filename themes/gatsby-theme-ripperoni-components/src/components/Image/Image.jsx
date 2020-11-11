/** @jsx jsx */
import { forwardRef, useRef } from 'react';
import { Image as ImageUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import uniqueid from 'lodash.uniqueid';

import { Box } from '../Box';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { ImageSharp } from './ImageSharp';
import { ImageStatic } from './ImageStatic';
import { ImageContentful } from './ImageContentful';

export const Image = forwardRef(
  ({ src, altTxt, imgStyle, imgClassName, ...props }, ref) => {
    const localRef = useRef();
    // const [isVisible, setIsVisible] = useState(false);
    const imageId = useRef(uniqueid('image-'));

    useIntersectionObserver({
      target: localRef,
      onIntersect: ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
          // setIsVisible(true);
          observerElement.unobserve(localRef.current);
        }
      },
    });

    return (
      <Box
        id={imageId.current}
        ref={ref}
        data-comp={Image.displayName}
        {...props}
      >
        {/* {isVisible && ( */}
        <ImageUI
          ref={localRef}
          src={src}
          alt={altTxt}
          className={['image', imgClassName].join(' ')}
          sx={{
            width: '100%',
            maxWidth: '100%',
            display: 'block',
            ...imgStyle,
          }}
        />
        {/* )} */}
      </Box>
    );
  }
);

Image.Sharp = ImageSharp;
Image.Static = ImageStatic;
Image.Contentful = ImageContentful;
Image.displayName = 'Image';

Image.propTypes = {
  src: PropTypes.string.isRequired,
  altTxt: PropTypes.string.isRequired,
  imgStyle: PropTypes.object,
  imgClassName: PropTypes.string,
};

Image.defaultProps = {
  src: 'https://via.placeholder.com/800',
  altTxt: 'An image',
  imgStyle: {},
  imgClassName: '',
};
