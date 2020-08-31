/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { Grid } from '@ripperoni/components';


export const SlottedContent = ({ desktopGrid, mobileGrid, children }) => {
  if (!desktopGrid) {
    return null;
  }

  const rows = desktopGrid.split("' '").length;
  const rowsMobile = mobileGrid.split("' '").length;
  const columns = desktopGrid.split("' '")[0].split(' ').length;
  const columnsMobile = mobileGrid.split("' '")[0].split(' ').length;

  return (
    <Grid
      gridTemplateColumns={[
        `repeat(${columnsMobile}, 1fr)`,
        null,
        null,
        `repeat(${columns}, 1fr)`
      ]}
      gridTemplateRows={[
        `repeat(${rowsMobile}, 1fr)`,
        null,
        null,
        `repeat(${rows}, 1fr)`
      ]}
      gridTemplateAreas={[
        mobileGrid,
        null,
        null,
        desktopGrid
      ]}
    >
      {children}
    </Grid>
  );
};

SlottedContent.displayName = 'SlottedContent';

SlottedContent.propTypes = {
  desktopGrid: PropTypes.string,
  mobileGrid: PropTypes.string,
  children: PropTypes.any,
};
