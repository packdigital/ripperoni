/* eslint-disable import/no-default-export */
import { numberOrStringOrArray } from './types';


const sx = [
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
];

const computed = {
  width: ({ value }) => {
    const convertToPercentage = input => (typeof(input) === 'number' && input <= 1)
      ? `${input * 100}%`
      : input;

    const width = Array.isArray(value)
      ? value.map(convertToPercentage)
      : convertToPercentage(value);

    return { width };
  },
};

const propTypes = {
  height: numberOrStringOrArray,
  width: numberOrStringOrArray,
  maxWidth: numberOrStringOrArray,
};

export default {
  sx,
  computed,
  propTypes,
};
