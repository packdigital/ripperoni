/* eslint-disable import/no-default-export */
import PropTypes from 'prop-types';

import { numberOrStringOrArray } from './types';


const sx = [
  'flex',
  'flexBasis',
  'order',
  'flexGrow',
  'flexShrink',
  'alignSelf',
];

const propTypes = {
  flex: numberOrStringOrArray,
  flexBasis: numberOrStringOrArray,
  order: numberOrStringOrArray,
  flexGrow: numberOrStringOrArray,
  flexShrink: numberOrStringOrArray,
  alignSelf: PropTypes.string,
};

export default {
  sx,
  propTypes,
};
