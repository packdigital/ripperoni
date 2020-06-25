import PropTypes from 'prop-types';


export const sxProps = [
  'color',
  'display',
  'height',
  'width',
  'flexBasis',
  'maxWidth',
  'position',
  'zIndex',
];

export const propTypes = {
  sx: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.string,
  as: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.func,
    PropTypes.elementType,
  ]),
  display: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.any,
};
