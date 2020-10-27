/**
 * @jsx jsx
 * @prettier
 */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';

import { Svg } from '../Svg';
import { Box } from '../Box';

export const ImageContentful = forwardRef((incomingProps, ref) => {
  const {
    alt,
    primaryImage = {},
    secondaryImage = {},
    primaryImageSizes: primarySizes,
    secondaryImageSizes: secondarySizes,
    imgProps,
    ...props
  } = incomingProps;
  const isSvg = primaryImage?.file?.fileName.includes('svg');
  const sharpType = primaryImage?.fluid ? 'fluid' : 'fixed';
  const primarySharp = primaryImage && primaryImage[sharpType];
  const secondarySharp = secondaryImage?.[sharpType] || {};
  const primaryMedia = primarySizes && { media: `(${primarySizes})` };
  const secondaryMedia = secondarySizes && { media: `(${secondarySizes})` };
  const hasArtDirection = secondaryImage && (primaryMedia || secondaryMedia);
  const withArtDireciton = [
    { ...primarySharp, ...primaryMedia },
    { ...secondarySharp, ...secondaryMedia },
  ];
  const sources = hasArtDirection ? withArtDireciton : primarySharp;
  const imageProps = { [sharpType]: sources, ...imgProps };

  if (!primarySharp && !isSvg) {
    return null;
  }

  if (isSvg) {
    return (
      <Svg.Static
        data-comp='Contentful SVG'
        alt={alt}
        uri={primaryImage.file.url}
        {...props}
      />
    );
  }

  return (
    <Box {...props}>
      <GatsbyImage
        data-comp={ImageContentful.displayName}
        ref={ref}
        {...imageProps}
      />
    </Box>
  );
});

ImageContentful.displayName = 'Contentful Image';

ImageContentful.propTypes = {
  alt: PropTypes.string,
  primaryImage: PropTypes.shape({
    fluid: PropTypes.object,
    fixed: PropTypes.object,
    svg: PropTypes.shape({
      content: PropTypes.string,
    }),
  }).isRequired,
  secondaryImage: PropTypes.shape({
    fluid: PropTypes.object,
    fixed: PropTypes.object,
  }),
  primaryImageSizes: PropTypes.string,
  secondaryImageSizes: PropTypes.string,
};
