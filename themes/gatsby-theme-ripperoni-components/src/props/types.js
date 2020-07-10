import PropTypes from 'prop-types';


export const numberOrString = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

export const numberOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.array,
]);

export const numberOrStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array,
]);

export const numberOrStringOrBoolOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.bool,
  PropTypes.array,
]);

export const stringOrArray = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.array,
]);

export const stringOrBoolOrArray = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.bool,
  PropTypes.array,
]);
