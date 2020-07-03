export const sxProps = [
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

sxProps.wrap = 'flexWrap';
sxProps.direction = 'flexDirection';

const isNotArrayAndColumn = props => {
  const directionProp = props.flexDirection || props.direction;

  if (!directionProp || Array.isArray(directionProp)) {
    return false;
  }

  return directionProp.includes('column');
};

export const toggleProps = {
  wrap: { flexWrap: 'wrap' },
  baseline: { alignItems: 'baseline' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
  evenly: { justifyContent: 'space-evenly' },
  reverse: {
    condition: isNotArrayAndColumn,
    true: { flexDirection: 'column-reverse' },
    false: { flexDirection: 'row-reverse' },
  },
  left: {
    condition: isNotArrayAndColumn,
    true: { alignItems: 'flex-start' },
    false: { justifyContent: 'flex-start' },
  },
  right: {
    condition: isNotArrayAndColumn,
    true: { alignItems: 'flex-end' },
    false: { justifyContent: 'flex-end' },
  },
  center: {
    condition: isNotArrayAndColumn,
    true: { alignItems: 'center' },
    false: { justifyContent: 'center' },
  },
  top: {
    condition: isNotArrayAndColumn,
    true: { justifyContent: 'flex-start' },
    false: { alignItems: 'flex-start' },
  },
  middle: {
    condition: isNotArrayAndColumn,
    true: { justifyContent: 'center' },
    false: { alignItems: 'center' },
  },
  bottom: {
    condition: isNotArrayAndColumn,
    true: { justifyContent: 'flex-end' },
    false: { alignItems: 'flex-end' },
  },
};
