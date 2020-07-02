import PropTypes from 'prop-types';


export const sxProps = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',

  'color',
  'bg',

  'display',
  'height',
  'minHeight',
  'width',
  'maxWidth',

  'flex',
  'flexBasis',
  'order',
  'flexGrow',
  'flexShrink',
  'alignSelf',
  'justifySelf',
  'placeSelf',


  'gridColumnStart',
  'gridColumnEnd',
  'gridRowStart',
  'gridRowEnd',
  'gridColumn',
  'gridRow',
  'gridArea',

  'position',
  'zIndex',

  'transform',

  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderStyle',
  'borderTopStyle',
  'borderRightStyle',
  'borderBottomStyle',
  'borderLeftStyle',
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'bordrRadius',
  'borderTopRightRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',
  'borderTopLeftRadius',
  'boxShadow',
  'opacity',
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

  border: PropTypes.string,
  borderTop: PropTypes.string,
  borderRight: PropTypes.string,
  borderBottom: PropTypes.string,
  borderLeft: PropTypes.string,
  borderStyle: PropTypes.string,
  borderTopStyle: PropTypes.string,
  borderRightStyle: PropTypes.string,
  borderBottomStyle: PropTypes.string,
  borderLeftStyle: PropTypes.string,
  borderWidth: PropTypes.string,
  borderTopWidth: PropTypes.string,
  borderRightWidth: PropTypes.string,
  borderBottomWidth: PropTypes.string,
  borderLeftWidth: PropTypes.string,
  borderColor: PropTypes.string,
  borderTopColor: PropTypes.string,
  borderRightColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  borderLeftColor: PropTypes.string,
  bordrRadius: PropTypes.string,
  borderTopRightRadius: PropTypes.string,
  borderBottomRightRadius: PropTypes.string,
  borderBottomLeftRadius: PropTypes.string,
  borderTopLeftRadius: PropTypes.string,
  boxShadow: PropTypes.string,
  opacity: PropTypes.string,
};
