/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import { motion } from 'framer-motion';

import { Box } from '@ripperoni/components/Box';
import { useSxProps } from '@ripperoni/components/hooks/useSxProps';


const AnimatedOverlay = motion.custom(Box);

const variants = {
  initial: {
    opacity: 0,
    transition: {
      ease: 'linear',
      duration: 0.2
    },
  },
  completed: {
    opacity: 0.3,
    transition: {
      ease: 'linear',
      duration: 0.2
    },
  },
};

export const Overlay = forwardRef(({
  animated = true,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Overlay.propTypes = {
    ...propTypes,
    animate: PropTypes.bool,
  };

  if (animated) {
    return (
      <AnimatedOverlay
        data-comp='Animated Overlay'
        ref={ref}
        bg='black'
        position='fixed'
        top={0}
        right={0}
        bottom={0}
        left={0}
        zIndex={2}
        sx={sxObject}
        variants={variants}
        initial='initial'
        animate='completed'
        exit='initial'
        {...props}
      />
    );
  }

  return (
    <Box
      data-comp={Overlay.displayName}
      ref={ref}
      bg='rgba(0, 0, 0, 0.3)'
      position='fixed'
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex={1}
      sx={sxObject}
      {...props}
    />
  );
});

Overlay.displayName = 'Overlay';
