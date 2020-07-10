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
  // save for later to add back in to sx object at end
  const { variant: incomingSxVariant, ...incomingSxWithoutVariant } = incomingProps.sx || {};
  const incomingPropsWithSx = { ...incomingProps, ...incomingSxWithoutVariant };

  const {
    sx = [],
    alias = {},
    computed = {},
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
    ...sx,
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
    ...alias,
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
    ...computed,
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

  const sxObject = Object.entries(incomingPropsWithSx)
    // filter out any non-sx props
    .filter(([prop]) => eligibleProps.includes(prop))
    // map aliased props to their sx prop
    .map(([prop, value]) => aliasProps[prop] ? [aliasProps[prop], value] : [prop, value])
    .reduce((sxObject, [prop, value], index, source) => {
      if (sxProps.includes(prop)) {
        return {
          ...sxObject,
          [prop]: value,
        };
      }

      if (computedProps[prop]) {
        const fn = computedProps[prop];
        const props = Object.fromEntries(source);

        return {
          ...sxObject,
          ...fn({ value, props }),
        };
      }

      return sxObject;
    }, { variant: incomingSxVariant });  // add sx variant back into sx object

  const propsEntries = Object.entries(incomingPropsWithSx)
    .filter(([prop]) => !eligibleProps.includes(prop) && prop !== 'sx');

  const props = Object.fromEntries(propsEntries);

  return { sxObject, props, propTypes };
};
