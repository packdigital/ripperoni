/**
 * @jsx jsx
 * @prettier
 */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { Grid } from '@ripperoni/components';

const parseGrids = (grids) => {
  const gridsDetails = grids.reduce((grids, { grid, viewport }) => {
    if (!grid) {
      return grids;
    }

    const originalGrid = grid
      .split("' '")
      .map((row) => row.replace("'", '').split(' '));
    const columns = grid.split("' '")[0].split(' ').length;
    const rows = originalGrid
      .map((row) => (row.every((cell) => cell === '.') ? '1fr' : 'min-content'))
      .join(' ');

    return {
      ...grids,
      [viewport]: {
        grid,
        rows,
        columns: `repeat(${columns}, 1fr)`,
      },
    };
  }, {});

  if (Object.keys(gridsDetails).length === 1) {
    const remappedGrid = Object.entries(gridsDetails).map(([, value]) => [
      'all',
      value,
    ]);

    return Object.fromEntries(remappedGrid);
  }

  return gridsDetails;
};

export const SlottedContent = forwardRef(
  ({ grids, slotsNodes, ...props }, ref) => {
    if (!grids) {
      return null;
    }

    const parsedGrids = parseGrids(grids);

    return (
      <Grid
        ref={ref}
        gridTemplateColumns={[
          parsedGrids?.all?.columns || parsedGrids?.mobile?.columns || null,
          parsedGrids?.mobile?.columns || null,
          parsedGrids?.tablet?.columns || null,
          parsedGrids?.desktop?.columns || null,
        ]}
        gridTemplateRows={[
          parsedGrids?.all?.rows || parsedGrids?.mobile?.rows || null,
          parsedGrids?.mobile?.rows || null,
          parsedGrids?.tablet?.rows || null,
          parsedGrids?.desktop?.rows || null,
        ]}
        gridTemplateAreas={[
          parsedGrids?.all?.grid || parsedGrids?.mobile?.grid || null,
          parsedGrids?.mobile?.grid || null,
          parsedGrids?.tablet?.grid || null,
          parsedGrids?.desktop?.grid || null,
        ]}
        gridRowGap={0}
        gridColumnGap={0}
        {...props}
      >
        {slotsNodes}
      </Grid>
    );
  }
);

SlottedContent.displayName = 'SlottedContent';

SlottedContent.propTypes = {
  grids: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.any,
};
