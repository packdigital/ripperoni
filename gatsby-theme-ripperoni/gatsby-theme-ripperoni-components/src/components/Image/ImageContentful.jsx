/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';

import { Svg } from '../Svg';


export const ImageContentful = ({
  alt,
  primaryImage = {},
  secondaryImage = {},
  primaryImageSizes,
  secondaryImageSizes,
  ...props
}) => {
  const isSvg = primaryImage.file?.fileName.includes('svg');
  const sharpType = primaryImage.fluid ? 'fluid' : 'fixed';
  const primarySharp = primaryImage[sharpType];
  const secondarySharp = secondaryImage[sharpType];
  const primaryMedia = primaryImageSizes && { media: `(${primaryImageSizes})` };
  const secondaryMedia = secondaryImageSizes && { media: `(${secondaryImageSizes})` };
  const hasArtDirection = secondaryImage && (primaryMedia || secondaryMedia);
  const sources = hasArtDirection
    ? [{ ...primarySharp, ...primaryMedia }, { ...secondarySharp, ...secondaryMedia }]
    : primarySharp;
  const imageProps = { [sharpType]: sources };

  if (!primarySharp && !isSvg) {
    return null;
  }

  if (isSvg) {
    return (
      <Svg.Static
        alt={alt}
        uri={primaryImage.file.url}
        {...props}
      />
    );
  }

  return (
    <GatsbyImage
      data-comp='ContentfulImage'
      {...imageProps}
      {...props}
    />
  );
};

ImageContentful.displayName = 'Contentful Image';

ImageContentful.propTypes = {
  alt: PropTypes.string,
  primaryImage: PropTypes.shape({
    fluid: PropTypes.object,
    fixed: PropTypes.object,
    svg: PropTypes.shape({
      content: PropTypes.string
    }),
  }).isRequired,
  secondaryImage: PropTypes.shape({
    fluid: PropTypes.object,
    fixed: PropTypes.object,
  }),
  primaryImageSizes: PropTypes.string,
  secondaryImageSizes: PropTypes.string,
};
