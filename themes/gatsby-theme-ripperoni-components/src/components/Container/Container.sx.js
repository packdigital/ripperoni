/* eslint-disable import/no-default-export */
import PropTypes from 'prop-types';

import { numberOrStringOrArray } from '../../props/types';


const alias = {
  gutter: 'px',
  contain: 'maxWidth',
};

const computed = {
  center: ({ value }) => ({ mx: value === true && 'auto' }),
  left: ({ value }) => ({ mr: value === true && 'auto' }),
  right: ({ value }) => ({ ml: value === true && 'auto' }),
};

const propTypes = {
  contain: numberOrStringOrArray,
  center: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default {
  alias,
  computed,
  propTypes,
};
