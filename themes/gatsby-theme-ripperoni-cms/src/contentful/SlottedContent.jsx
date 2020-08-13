/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { Grid } from '@ripperoni/components';


export const SlottedContent = ({ layout, layoutMobile, children }) => {
  if (!layout) {
    return null;
  }

  const rows = layout.split("' '").length;
  const rowsMobile = layoutMobile.split("' '").length;
  const columns = layout.split("' '")[0].split(' ').length;
  const columnsMobile = layoutMobile.split("' '")[0].split(' ').length;

  return (
    <Grid
      gridTemplateColumns={[`repeat(${columnsMobile}, 1fr)`, null, null, `repeat(${columns}, 1fr)`]}
      gridTemplateRows={[`repeat(${rowsMobile}, auto)`, null, null, `repeat(${rows}, auto)`]}
      gridTemplateAreas={[layoutMobile, null, null, layout]}
    >
      {children}
    </Grid>
  );
};

SlottedContent.displayName = 'SlottedContent';

SlottedContent.propTypes = {
  layout: PropTypes.string,
  layoutMobile: PropTypes.string,
  lookup: PropTypes.object,
  slots: PropTypes.array,
  children: PropTypes.any,
};
