/** @jsx jsx */
import { forwardRef } from 'react';
import { Grid as GridUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import GridSx from './Grid.sx';
import { useSxProps } from '../../hooks/useSxProps';


export const Grid = forwardRef((incomingProps, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps, GridSx);

  Grid.propTypes = {
    ...propTypes,
    children: PropTypes.any,
  };

  return (
    <GridUI
      data-comp={Grid.displayName}
      ref={ref}
      sx={sxObject}
      width={props.uiWidth}
      gap={props.uiGap}
      columns={props.uiColumns}
      {...props}
    >
      {props.children}
    </GridUI>
  );
});

Grid.displayName = 'Grid';
