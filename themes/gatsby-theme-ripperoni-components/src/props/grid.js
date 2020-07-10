/* eslint-disable import/no-default-export */
import { numberOrStringOrArray, stringOrArray } from './types';


const sx = [
  'gridColumnStart',
  'gridColumnEnd',
  'gridRowStart',
  'gridRowEnd',
  'gridColumn',
  'gridRow',
  'gridArea',
  'justifySelf',
  'placeSelf',
];

const propTypes = {
  gridColumnStart: numberOrStringOrArray,
  gridColumnEnd: numberOrStringOrArray,
  gridRowStart: numberOrStringOrArray,
  gridRowEnd: numberOrStringOrArray,
  gridColumn: numberOrStringOrArray,
  gridRow: numberOrStringOrArray,
  gridArea: numberOrStringOrArray,
  justifySelf: stringOrArray,
  placeSelf: stringOrArray,
};

export default {
  sx,
  propTypes,
};
