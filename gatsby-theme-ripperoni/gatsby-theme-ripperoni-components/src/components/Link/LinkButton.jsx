/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Link } from './Link';


export const LinkButton = ({
  sx,
  ...props
}) => {
  LinkButton.propTypes = Link.propTypes;

  return (
    <Link
      sx={{
        variant: 'buttons.primary',
        ...sx,
      }}
      {...props}
    />
  );
};

LinkButton.displayName = 'Link Button';
