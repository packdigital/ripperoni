/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Divider as DividerUI, jsx } from 'theme-ui';

import { Box } from '../Box';
import { useSxProps } from '../../hooks/useSxProps';


export const Divider = forwardRef(({
  height,
  width,
  color = 'primary',
  vertical,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Divider.propTypes = {
    ...propTypes,
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    color: PropTypes.string,
    vertical: PropTypes.bool,
  };

  if (vertical) {
    return (
      <Box
        data-comp={Divider.displayName}
        ref={ref}
        sx={{
          height,
          width: width || '1px',
          borderRightWidth: width || '1px',
          borderRightStyle: 'solid',
          borderRightColor: color,
          ...sxObject
        }}
        {...props}
      />
    );
  }

  return (
    <DividerUI
      data-comp={Divider.displayName}
      ref={ref}
      sx={{
        color,
        m: 0,
        height: height || '1px',
        width: width || '100%',
        borderBottomWidth: height || '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: color,
        ...sxObject
      }}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';
