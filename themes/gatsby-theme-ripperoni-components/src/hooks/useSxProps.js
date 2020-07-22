import background from '../props/background';
import border from '../props/border';
import color from '../props/color';
import flex from '../props/flex';
import grid from '../props/grid';
import position from '../props/position';
import size from '../props/size';
import space from '../props/space';
import typography from '../props/typography';


export const useSxProps = (incomingProps = {}, componentSxProps = {}) => {
  const {
    sx: componentSx = [],
    alias: componentAlias = {},
    computed: componentComputed = {},
    propTypes: componentPropTypes = {}
  } = componentSxProps;

  const sxProps = [
    ...background.sx,
    ...border.sx,
    ...color.sx,
    ...flex.sx,
    ...grid.sx,
    ...position.sx,
    ...size.sx,
    ...space.sx,
    ...typography.sx,
    ...componentSx,
  ];

  const aliasProps = {
    ...background.alias,
    ...border.alias,
    ...color.alias,
    ...flex.alias,
    ...grid.alias,
    ...position.alias,
    ...size.alias,
    ...space.alias,
    ...typography.alias,
    ...componentAlias,
  };

  const computedProps = {
    ...background.computed,
    ...border.computed,
    ...color.computed,
    ...flex.computed,
    ...grid.computed,
    ...position.computed,
    ...size.computed,
    ...space.computed,
    ...typography.computed,
    ...componentComputed
  };

  const propTypes = {
    ...background.propTypes,
    ...border.propTypes,
    ...color.propTypes,
    ...flex.propTypes,
    ...grid.propTypes,
    ...position.propTypes,
    ...size.propTypes,
    ...space.propTypes,
    ...typography.propTypes,
    ...componentPropTypes,
  };

  const eligibleProps = [
    ...sxProps,
    ...Object.keys(aliasProps),
    ...Object.keys(computedProps),
  ];

  const computedSxObject = Object.entries(incomingProps)
    // filter out any non-sx props
    .filter(([prop]) => eligibleProps.includes(prop))
    // map aliased props to their sx prop
    .map(([prop, value]) => aliasProps[prop] ? [aliasProps[prop], value] : [prop, value])
    .reduce((sxObject, [prop, value], index, source) => {
      // computed props take precident over regular sx props because certain
      // components can have computed props that overwrite default sx props
      // e.g. top|right|bottom|left on flex.sx overwrites position
      if (computedProps[prop]) {
        const fn = computedProps[prop];
        const props = Object.fromEntries(source);

        return {
          ...sxObject,
          ...fn({ value, props }),
        };
      }

      // computed props take precident
      if (sxProps.includes(prop)) {
        return {
          ...sxObject,
          [prop]: value,
        };
      }

      return sxObject;
    }, {});

  const sxObject = { ...computedSxObject, ...incomingProps.sx };

  const props = Object.entries(incomingProps)
    .filter(([prop]) => !eligibleProps.includes(prop) && prop !== 'sx')
    .reduce((props, [key, value]) => ({ ...props, [key]: value }), {});

  return { sxObject, props, propTypes };
};
