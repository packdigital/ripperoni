/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Link } from './Link';


export const LinkButton = props => {
  LinkButton.propTypes = Link.propTypes;

  return (
    <Link
      variant='buttons.primary'
      {...props}
    />
  );
};

LinkButton.displayName = 'Link Button';
