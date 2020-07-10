/* eslint-disable import/no-default-export */
import { stringOrArray } from './types';


const sx = [
  'bg',
  'color',
  'opacity',
  'boxShadow',
];

const alias = {
  shadow: 'boxShadow',
};

const propTypes = {
  bg: stringOrArray,
  color: stringOrArray,
  opacity: stringOrArray,
  boxShadow: stringOrArray,
};

export default {
  sx,
  alias,
  propTypes,
};
