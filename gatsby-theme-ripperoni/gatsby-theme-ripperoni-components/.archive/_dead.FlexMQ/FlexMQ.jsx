import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Flex, useThemeUI } from 'theme-ui';

import { useResponsiveProp } from '../../hooks/useResponsiveProp';
import { usePropsToSxResolver } from '../../hooks/usePropsToSxResolver';
import sxFlexColOptions from '../FlexCol/FlexCol.sx';

import FlexMQCsr from './FlexMQ.Csr';
import sxFlexRowOptions from './FlexRow.sx';


export const FlexMQ = forwardRef(({ direction, children, sx = {}, css = {}, ...props }, ref) => {
  const context = useThemeUI();
  const { theme } = context;

  // props at this level includes each breakpoints props
  const responsiveOptions = {
    fillUntilIndex: direction.length,
    falseReturns: false
  };

  // ensure story book updated knob values are booleans
  const toBooleanVal = (val) => typeof val === 'boolean'
    ? val
    : val === 'true'
      ? true
      : val === 'false'
        ? false
        : false;

  // convert prop arrays to responsive props
  let responsiveProps = {
    direction: useResponsiveProp({ initItems: direction, ...responsiveOptions }),
    around: useResponsiveProp({ initItems: props.around.map(toBooleanVal), ...responsiveOptions }),
    between: useResponsiveProp({ initItems: props.between.map(toBooleanVal), ...responsiveOptions }),
    bottom: useResponsiveProp({ initItems: props.bottom.map(toBooleanVal), ...responsiveOptions }),
    center: useResponsiveProp({ initItems: props.center.map(toBooleanVal), ...responsiveOptions }),
    evenly: useResponsiveProp({ initItems: props.evenly.map(toBooleanVal), ...responsiveOptions }),
    left: useResponsiveProp({ initItems: props.left.map(toBooleanVal), ...responsiveOptions }),
    middle: useResponsiveProp({ initItems: props.middle.map(toBooleanVal), ...responsiveOptions }),
    reverse: useResponsiveProp({ initItems: props.reverse.map(toBooleanVal), ...responsiveOptions }),
    right: useResponsiveProp({ initItems: props.right.map(toBooleanVal), ...responsiveOptions }),
    stretch: useResponsiveProp({ initItems: props.stretch.map(toBooleanVal), ...responsiveOptions }),
    stretchX: useResponsiveProp({ initItems: props.stretchX.map(toBooleanVal), ...responsiveOptions }),
    stretchY: useResponsiveProp({ initItems: props.stretchY.map(toBooleanVal), ...responsiveOptions }),
    top: useResponsiveProp({ initItems: props.top.map(toBooleanVal), ...responsiveOptions }),
    wrapped: useResponsiveProp({ initItems: props.wrapped.map(toBooleanVal), ...responsiveOptions }),
  };

  const sxSets = useMemo(() => responsiveProps.direction.map((dir, dirIndex) => {
    let sxSet = [];
    // extract a breakpoints set of props from the arrays
    const toBreakpointProps = (propsObj, propKey) => {
      const isValidFlexProp = typeof responsiveProps[propKey] !== 'undefined';

      if (isValidFlexProp) {
        const isValidAndEnabled = (
          responsiveProps[propKey][dirIndex] === 'true' ||
          responsiveProps[propKey][dirIndex]
        );

        if (isValidAndEnabled) {
          // Add this enabled prop to the current Flex
          // and force to boolean is valid and set
          propsObj[propKey] = true;
          return propsObj;
        } else {
          // ignore valid but not enabled i.e false flex prop
          return propsObj;
        }
      } else {
        // console.warn('non-flex prop is allowed to pass through', propKey);
        return { ...propsObj, [propKey]: props[propKey] };
      }
    };

    // The extracted props for the given breakpoint
    const breakpointProps = Object.keys(props)
      .reduce(toBreakpointProps, { children, sx, css });

    if (dir === 'col') {
      sxSet = usePropsToSxResolver(breakpointProps, sxFlexColOptions(theme, breakpointProps.reverse));
    } else {
      sxSet = usePropsToSxResolver(breakpointProps, sxFlexRowOptions(theme, breakpointProps.reverse));
    }

    return sxSet;

  }), [children, sx, css, responsiveProps, props]);

  // css, children and any other prop passed minus sx
  const sxLessProps = sxSets[0][1];

  // sxs per breakpoint
  const sxPresets = sxSets.map((sxSet) => sxSet[0]);

  // combined sx styles
  const sxPreset = sxPresets
    .reduce((sxPresetObject, mqSxPreset) => {
      // join array of mq sx's into a single object with responsive [] styles
      // i.e transforms: [ {flexDirection: 'row', justifyContent: 'center'}, flexDirection: 'col', justifyContent: 'flex-end']
      // i.e into: { flexDirection: ['row', 'column'], justifyContent: ['center', 'flex-end']}

      for (let style in mqSxPreset) {
        if (sxPresetObject[style]) {
          sxPresetObject[style] = [...sxPresetObject[style], mqSxPreset[style]];
        } else {
          sxPresetObject[style] = [mqSxPreset[style]];
        }
      }
      return sxPresetObject;
    }, {});

  return (
    <Flex
      ref={ref}
      data-comp='FlexMQ'
      sx={sxPreset}
      {...sxLessProps}
    />
  );
});

FlexMQ.displayName = 'FlexMQ';

FlexMQ.propTypes = {
  direction: PropTypes.arrayOf(PropTypes.oneOf(['row', 'col'])),
  sx: PropTypes.object,
  css: PropTypes.object,
  around: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  between: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  bottom: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  center: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  evenly: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  left: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  middle: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  reverse: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  right: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  stretch: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  stretchX: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  stretchY: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  top: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
  wrapped: PropTypes.arrayOf(PropTypes.oneOf([true, false])),
};

FlexMQ.defaultProps = {
  direction: ['row'],
  sx: {},
  css: {},
  around: [false],
  between: [false],
  bottom: [false],
  center: [false],
  evenly: [false],
  left: [false],
  middle: [false],
  reverse: [false],
  right: [false],
  stretch: [false],
  stretchX: [false],
  stretchY: [false],
  top: [false],
  wrapped: [false]
};

FlexMQ.Csr = FlexMQCsr;

export default FlexMQ;
