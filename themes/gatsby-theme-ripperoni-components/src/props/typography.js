/* eslint-disable import/no-default-export */
import PropTypes from 'prop-types';

import { numberOrStringOrArray, stringOrArray } from './types';


const sx = [
  'color',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textDecoration',
  'textTransform',
];

const alias = {
  family: 'fontFamily',
  weight: 'fontWeight',
};

const computed = {
  italic: ({ value }) => ({ fontStyle: value === true && 'italic' }),
  strikethrough: ({ value }) => ({ textDecoration: value === true && 'line-through' }),
  underline: ({ value }) => ({ textDecoration: value === true && 'underline' }),
  uppercase: ({ value }) => ({ textTransform: value === true && 'uppercase' }),
  lowercase: ({ value }) => ({ textTransform: value === true && 'lowercase' }),
  capitalize: ({ value }) => ({ textTransform: value === true && 'capitalize' }),
};

const propTypes = {
  family: stringOrArray,
  weight: numberOrStringOrArray,
  fontSize: numberOrStringOrArray,
  fontWeight: numberOrStringOrArray,
  fontFamily: stringOrArray,
  textTransform: stringOrArray,
  textAlign: stringOrArray,
  lineHeight: numberOrStringOrArray,
  letterSpacing: stringOrArray,
  color: stringOrArray,
  textDecoration: stringOrArray,
  italic: PropTypes.bool,
  strikethrough: PropTypes.bool,
  underline: PropTypes.bool,
  uppercase: PropTypes.bool,
  lowercase: PropTypes.bool,
  capitalize: PropTypes.bool,
};

export default {
  sx,
  alias,
  computed,
  propTypes,
};
