/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { Grid } from '@ripperoni/components';


export const SlottedContent = ({ gridDesktop, gridMobile, children }) => {
  if (!gridDesktop) {
    return null;
  }

  const rows = gridDesktop.split("' '").length;
  const rowsMobile = gridMobile.split("' '").length;
  const columns = gridDesktop.split("' '")[0].split(' ').length;
  const columnsMobile = gridMobile.split("' '")[0].split(' ').length;

  return (
    <Grid
      gridTemplateColumns={[`repeat(${columnsMobile}, 1fr)`, null, null, `repeat(${columns}, 1fr)`]}
      gridTemplateRows={[`repeat(${rowsMobile}, auto)`, null, null, `repeat(${rows}, auto)`]}
      gridTemplateAreas={[gridMobile, null, null, gridDesktop]}
    >
      {children}
    </Grid>
  );
};

SlottedContent.displayName = 'SlottedContent';

SlottedContent.propTypes = {
  gridDesktop: PropTypes.string,
  gridMobile: PropTypes.string,
  children: PropTypes.any,
};
