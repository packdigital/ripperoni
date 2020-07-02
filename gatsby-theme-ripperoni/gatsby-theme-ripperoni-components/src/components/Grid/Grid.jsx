/** @jsx jsx */
import { forwardRef } from 'react';
import { Grid as GridUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';

import * as gridProps from './Grid.sx';


export const Grid = forwardRef((incomingProps, ref) => {
  const { sxObject, props } = useSxProps(incomingProps, [gridProps]);

  return (
    <GridUI
      ref={ref}
      sx={{
        ...sxObject,
        display: 'grid'
      }}
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

Grid.propTypes = {
  ...defaultProps.propTypes,
  children: PropTypes.any,
};
