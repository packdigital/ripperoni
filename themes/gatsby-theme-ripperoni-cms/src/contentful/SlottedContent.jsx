/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { Grid } from '@ripperoni/components';


const parseGrids = grids => grids.reduce((grids, { grid, viewport }) => {
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

export const SlottedContent = ({ grids, children }) => {
  const parsedGrids = parseGrids(grids);

  return (
    <Grid
      gridTemplateColumns={[
        parsedGrids?.mobile?.columns || null,
        null,
        parsedGrids?.tablet?.columns || null,
        null,
        parsedGrids?.desktop?.columns || null,
      ]}
      gridTemplateRows={[
        parsedGrids?.mobile?.rows || null,
        null,
        parsedGrids?.tablet?.rows || null,
        null,
        parsedGrids?.desktop?.rows || null,
      ]}
      gridTemplateAreas={[
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
