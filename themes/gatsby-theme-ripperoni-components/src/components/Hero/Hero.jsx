import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@ripperoni/components';


export const Hero = ({
  image,
  height,
  backgroundColor,
  contentBounds,
  contentBox,
  children,
  ...props
}) => {

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
        {image}
      </Box>

      <Box
        data-comp='Hero Contents Box'
        position='absolute'
        top={contentBounds?.top || 0}
        bottom={contentBounds?.bottom || 0}
        left={contentBounds?.left || 0}
        right={contentBounds?.right || 0}
        {...contentBox}
      >
        {children}
      </Box>

    </Box>
  );
};

Hero.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
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
