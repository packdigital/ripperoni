import PropTypes from 'prop-types';


export const sxProps = [
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

sxProps.align = 'textAlign';
sxProps.family = 'fontFamily';
sxProps.size = 'fontSize';
sxProps.transform = 'textTransform';
sxProps.weight = 'fontWeight';

export const toggleProps = {
  italic: { fontStyle: 'italic' },
  strikethrough: { textDecoration: 'line-through' },
  underline: { textDecoration: 'underline' },
  uppercase: { textTransform: 'uppercase' },
  lowercase: { textTransform: 'lowercase' },
  capitalize: { textTransform: 'capitalize' },
};

export const propTypes = {
  align: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  family: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  transform: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  weight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  fontSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  fontWeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  fontFamily: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  textTransform: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  textAlign: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  lineHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  letterSpacing: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  textDecoration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  italic: PropTypes.bool,
  strikethrough: PropTypes.bool,
  underline: PropTypes.bool,
  uppercase: PropTypes.bool,
  lowercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
    PropTypes.func,
    PropTypes.number,
  ]),
};
