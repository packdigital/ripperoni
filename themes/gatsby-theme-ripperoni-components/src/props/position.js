/* eslint-disable import/no-default-export */
import { stringOrArray } from './types';


const sx = [
  'display',
  'position',
  'zIndex',
  'transform',
];

const computed = {
  translate: ({ value }) => ({ transform: `translate(${value})` }),
};

const propTypes = {
  display: stringOrArray,
};

export default {
  sx,
  computed,
  propTypes,
};
