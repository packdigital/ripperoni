/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { Grid } from '@ripperoni/components';


const parseGrids = grids => {
  const gridsDetails = grids.reduce((grids, { grid, viewport }) => {
    const rows = grid.split("' '").length;
    const columns = grid.split("' '")[0].split(' ').length;

    return {
      ...grids,
      [viewport]: {
        grid,
        rows: `repeat(${rows}, 1fr)`,
        columns: `repeat(${columns}, 1fr)`
      }
    };
  }, {});

  if (Object.keys(gridsDetails).length === 1) {
    return Object.fromEntries(Object.entries(gridsDetails).map(([key, value]) => ['all', value]));
  }

  return gridsDetails;
};

export const SlottedContent = ({ grids, children }) => {
  const parsedGrids = parseGrids(grids);


  return (
    <Grid
      gridTemplateColumns={[
        parsedGrids?.all?.columns || null,
        parsedGrids?.mobile?.columns || null,
        null,
        parsedGrids?.tablet?.columns || null,
        null,
        parsedGrids?.desktop?.columns || null,
      ]}
      gridTemplateRows={[
        parsedGrids?.all?.rows || null,
        parsedGrids?.mobile?.rows || null,
        null,
        parsedGrids?.tablet?.rows || null,
        null,
        parsedGrids?.desktop?.rows || null,
      ]}
      gridTemplateAreas={[
        parsedGrids?.all?.grid || null,
        parsedGrids?.mobile?.grid || null,
        null,
        parsedGrids?.tablet?.grid || null,
        null,
        parsedGrids?.desktop?.grid || null,
      ]}
      gridRowGap={0}
      gridColumnGap={0}
    >
      {children}
    </Grid>
  );
};

SlottedContent.displayName = 'SlottedContent';

SlottedContent.propTypes = {
  grids: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.any,
};
