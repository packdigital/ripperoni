/* eslint-disable import/no-default-export */
import { numberOrStringOrArray, stringOrArray } from './types';


const sx = [
  'display',
  'position',
  'zIndex',
  'transform',
  'top',
  'right',
  'bottom',
  'left',
  'overflow',
  'overflowX',
  'overflowY',
];

const computed = {
  translate: ({ value }) => ({ transform: `translate(${value})` }),
};

const propTypes = {
  display: stringOrArray,
  position: stringOrArray,
  zIndex: numberOrStringOrArray,
  transform: stringOrArray,
  top: numberOrStringOrArray,
  right: numberOrStringOrArray,
  bottom: numberOrStringOrArray,
  left: numberOrStringOrArray,
  overflow: stringOrArray,
  overflowX: stringOrArray,
  overflowY: stringOrArray,
};

export default {
  sx,
  computed,
  propTypes,
};
