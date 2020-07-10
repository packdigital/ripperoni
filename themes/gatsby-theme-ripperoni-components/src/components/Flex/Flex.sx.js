/* eslint-disable max-lines */
/* eslint-disable import/no-default-export */
import PropTypes from 'prop-types';

import {
  numberOrArray,
  numberOrStringOrArray,
  numberOrStringOrBoolOrArray,
  stringOrArray,
  stringOrBoolOrArray,
} from '../../props/types';


const sx = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'justifyContent',
  'justifyItems',
  'justifySelf',
  'order',
];

const alias = {
  wrap: 'flexWrap',
  direction: 'flexDirection',
};

const computeDirection = (prop, xAxis, yAxis, property) => {
  return ({ value, props: { flexDirection, ...props }}) => {
    // could be top|right|bottom|left for position
    if (typeof(value) !== 'boolean') {
      return { [prop]: value };
    }

    if (Array.isArray(flexDirection)) {
      return {
        [xAxis]: flexDirection.map((prop, i) => prop === 'row' && props?.[xAxis]?.[i] || property),
        [yAxis]: flexDirection.map((prop, i) => prop === 'column' && props?.[yAxis]?.[i] || property),
      };
    }

    if (flexDirection === 'column') {
      return { [yAxis]: property };
    }

    return { [xAxis]: property };
  };
};

const computed = {
  wrap: ({ value }) => ({ flexWrap: value === true && 'wrap' }),
  baseline: ({ value }) => ({ alignItems: value === true && 'baseline' }),
  between: ({ value }) => ({ justifyContent: value === true && 'space-between' }),
  around: ({ value }) => ({ justifyContent: value === true && 'space-around' }),
  evenly: ({ value }) => ({ justifyContent: value === true && 'space-evenly' }),
  reverse: ({ props: { flexDirection: direction }}) => {
    const mapDirectionProp = prop => {
      if (prop === 'column') return 'column-reverse';
      if (prop === 'row') return 'row-reverse';
      return prop;
    };

    const flexDirection = Array.isArray(direction)
      ? direction.map(mapDirectionProp)
      : direction === 'column'
        ? 'column-reverse'
        : 'row-reverse';

    return { flexDirection };
  },
  left: computeDirection('left', 'justifyContent', 'alignItems', 'flex-start'),
  center: computeDirection('center', 'justifyContent', 'alignItems', 'center'),
  right: computeDirection('right', 'justifyContent', 'alignItems', 'flex-end'),
  top: computeDirection('top', 'alignItems', 'justifyContent', 'flex-start'),
  middle: computeDirection('middle', 'alignItems', 'justifyContent', 'center'),
  bottom: computeDirection('bottom', 'alignItems', 'justifyContent', 'flex-end'),
};

const propTypes = {
  alignItems: stringOrArray,
  alignContent: stringOrArray,
  justifyItems: stringOrArray,
  justifyContent: stringOrArray,
  flexWrap: stringOrArray,
  flexDirection: stringOrArray,
  flex: numberOrStringOrArray,
  flexGrow: numberOrStringOrArray,
  flexShrink: numberOrStringOrArray,
  flexBasis: numberOrStringOrArray,
  justifySelf: stringOrArray,
  alignSelf: stringOrArray,
  order: numberOrArray,
  direction: stringOrArray,
  around: PropTypes.bool,
  baseline: PropTypes.bool,
  between: PropTypes.bool,
  evenly: PropTypes.bool,
  reverse: PropTypes.bool,
  wrap: stringOrBoolOrArray,
  top: numberOrStringOrBoolOrArray,
  middle: numberOrStringOrBoolOrArray,
  bottom: numberOrStringOrBoolOrArray,
  left: numberOrStringOrBoolOrArray,
  center: numberOrStringOrBoolOrArray,
  right: numberOrStringOrBoolOrArray,
};

export default {
  sx,
  computed,
  alias,
  propTypes,
};
