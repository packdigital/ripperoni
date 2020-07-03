/** @jsx jsx */
import { forwardRef } from 'react';
import { Flex as FlexUI, jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as typographyProps from '../../props/typography';
import { FlexCol } from './FlexCol';
import { FlexRow } from './FlexRow';
import * as flexProps from './Flex.sx';


export const Flex = forwardRef((incomingProps, ref) => {
  const { sxObject, props } = useSxProps(incomingProps, [typographyProps, flexProps]);

  return (
    <FlexUI
      ref={ref}
      sx={sxObject}
      {...props}
    />
  );
});

Flex.displayName = 'Flex';

Flex.Col = FlexCol;
Flex.Row = FlexRow;

Flex.propTypes = {
  ...defaultProps.propTypes,
  alignItems: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  alignContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  justifyItems: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  justifyContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  flexWrap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  flexDirection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  flex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  flexGrow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  flexShrink: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  flexBasis: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  justifySelf: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  alignSelf: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  order: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
  ]),
  direction: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  around: PropTypes.bool,
  baseline: PropTypes.bool,
  between: PropTypes.bool,
  evenly: PropTypes.bool,
  reverse: PropTypes.bool,
  wrap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
  ]),
  top: directionOrFlexDirectionIsArray,
  right: directionOrFlexDirectionIsArray,
  left: directionOrFlexDirectionIsArray,
  bottom: directionOrFlexDirectionIsArray,
  center: directionOrFlexDirectionIsArray,
  middle: directionOrFlexDirectionIsArray,
};


function directionOrFlexDirectionIsArray (props, propName, componentName) {
  const directionProp = props['flexDirection'] || props['direction'];

  if (props[propName] && Array.isArray(directionProp)) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. ` +
      `Cannot use ${propName} when flexDirection or Direction is an array.`
    );
  }
};
