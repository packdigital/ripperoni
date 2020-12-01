/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Link } from './Link';

export const LinkButton = forwardRef(({ sx, ...props }, ref) => {
  LinkButton.propTypes = Link.propTypes;

  return (
    <Link
      data-comp={LinkButton.displayName}
      ref={ref}
      sx={{
        // display: 'block',     // added (7-28-2020), make sure this doesn't break anything
        // textAlign: 'center',  // added (7-28-2020), make sure this doesn't break anything
        variant: 'buttons.primary',
        ...sx,
      }}
      {...props}
    />
  );
});

LinkButton.displayName = 'Link.Button';
