/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Image as ImageUI, jsx } from 'theme-ui';

import { Image } from '../Image';
import { AspectRatio } from './AspectRatio';


export const AspectRatioImage = forwardRef(({
  alt,
  title,
  ratio = [],
  lazy = true,
  ...props
}, ref) => (
  <AspectRatio
    data-comp={AspectRatioImage.displayName}
    ratio={ratio}
  >
    {lazy
      ? (
        <Image
          altTxt={alt || title || ''}
          css={{
            objectFit: 'cover',
          }}
          {...props}
        />
        )
      : (
        <ImageUI
          ref={ref}
          __css={{
            objectFit: 'cover',
          }}
          {...props}
        />
      )
    }
  </AspectRatio>
));


AspectRatioImage.displayName = 'AspectRatioImage';

AspectRatioImage.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  ratio: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]).isRequired,
  lazy: PropTypes.bool,
  props: PropTypes.object,
};
