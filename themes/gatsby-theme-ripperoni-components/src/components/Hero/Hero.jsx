import React from 'react';
import PropTypes from 'prop-types';

import { Box, Grid } from '@ripperoni/components';


export const Hero = ({
  _content = [],
  image,
  height,
  backgroundColor,
  contentBounds,
  contentBox,
  children,
  ...props
}) => {
  const [cmsImage, ...cmsContent] = _content;

  return (
    <Box
      data-comp={Hero.displayName}
      bg={backgroundColor}
      width='full'
      position='relative'
      {...props}
    >
      <Box
        width='full'
        height={height}
      >
        {image || cmsImage}
      </Box>

      <Grid
        data-comp='Hero Contents Box'
        position='absolute'
        top={contentBounds?.top || 0}
        bottom={contentBounds?.bottom || 0}
        left={contentBounds?.left || 0}
        right={contentBounds?.right || 0}
        {...contentBox}
      >
        {children || cmsContent}
      </Grid>
    </Box>
  );
};

Hero.propTypes = {
  _content: PropTypes.array,
  image: PropTypes.object,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  contentBounds: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }),
  contentBox: PropTypes.object,
  children: PropTypes.any,
};

Hero.displayName = 'Hero';
