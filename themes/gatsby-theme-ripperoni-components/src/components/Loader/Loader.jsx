/** @jsx jsx */
import PropTypes from 'prop-types';
import { Spinner, jsx } from 'theme-ui';

import { LoaderHoc } from './LoaderHoc';


export const Loader = ({
  title,
  size,
  width,
  color = 'primary',
  ...props
}) => {
  return (
    <Spinner
      data-comp={Loader.displayName}
      variant='loader'
      title={title}
      size={size}
      strokeWidth={width}
      color={color}
      {...props}
    />
  );
};

Loader.displayName = 'Loader';

Loader.Hoc = LoaderHoc;

Loader.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};
