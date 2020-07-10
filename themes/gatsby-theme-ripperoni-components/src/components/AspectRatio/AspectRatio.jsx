/** @jsx jsx */
import { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, jsx } from 'theme-ui';

import { AspectRatioImage } from './AspectRatioImage';


const AspectRatioChild = forwardRef(({
  height = 'ratio',
  children,
  ...props
}, ref) => (
  <Box
    data-comp={AspectRatioChild.displayName}
    ref={ref}
    {...props}
    __css={{
      position: height === 'ratio' ? 'absolute' : 'relative',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }}
  >
    {children}
  </Box>
));

AspectRatioChild.displayName = 'AspectRatio.Child';

AspectRatioChild.propTypes = {
  height: PropTypes.string,
  children: PropTypes.any,
};


export const AspectRatio = forwardRef(({
  ratio = [4 / 3],
  height = 'ratio',
  children,
  ...props
}, ref) => {
  const childRef = useRef();

  return (
    <Box
      data-comp={AspectRatio.displayName}
      ref={ref}
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >

      {/* Vertical Spacer */}
      {height === 'ratio' && (
        <Box
          data-comp='AspectRatio.Spacer'
          sx={{
            width: '100%',
            height: 0,
            paddingBottom: ratio.map(r => (100 / r + '%')),
          }}
        />
      )}

      <AspectRatioChild
        {...props}
        ref={childRef}
        height={height}
      >
        {children}
      </AspectRatioChild>
    </Box>
  );
});

AspectRatio.Image = AspectRatioImage;
AspectRatio.displayName = 'AspectRatio';

AspectRatio.propTypes = {
  ratio: PropTypes.arrayOf([
    PropTypes.number
  ]),
  height: PropTypes.string,
  children: PropTypes.any,
};
