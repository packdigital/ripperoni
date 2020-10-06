/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { Box } from '../Box';
import { CmsContent } from '../CmsContent';


export const Hero = ({
  image,
  height,
  backgroundColor,
  contentBounds,
  contentBox,
  children,
  fromCms,
  ...props
}) => {
  const Component = fromCms ? CmsContent : Box;

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

      <Component
        data-comp='Hero Contents Box'
        position='absolute'
        top={contentBounds?.top || 0}
        bottom={contentBounds?.bottom || 0}
        left={contentBounds?.left || 0}
        right={contentBounds?.right || 0}
        // eslint-disable-next-line react/no-children-prop
        children={children}
        {...contentBox}
      />
    </Box>
  );
};

Hero.propTypes = {
  fromCms: PropTypes.bool,
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
  _children: PropTypes.element
};

Hero.displayName = 'Hero';
