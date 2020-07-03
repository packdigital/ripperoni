import { deepMerge } from '@packdigital/ripperoni-utilities';

import * as defaultProps from '../props/default';


export const useSxProps = (incomingProps, possibleProps = []) => {
  const sxProp = incomingProps.sx || {};
  const { sxProps: availableSxProps = [], toggleProps: availableToggleProps = {}} = deepMerge(defaultProps, ...possibleProps);

  const { props, sxProps = {}, toggleProps = {}} = Object.entries(incomingProps)
    .reduce((parsedProps, [key, value]) => {
      const isToggleProp = typeof value === 'boolean' && Object.keys(availableToggleProps).includes(key);
      const sxKey = possibleProps.find(({ sxProps }) => sxProps[key])?.sxProps[key] || key;
      const isSxProp = availableSxProps.includes(sxKey);

      if (isToggleProp) {
        return {
          ...parsedProps,
          toggleProps: {
            ...parsedProps.toggleProps,
            [key]: value
          }
        };
      }

      if (isSxProp) {
        return {
          ...parsedProps,
          sxProps: {
            ...parsedProps.sxProps,
            [sxKey]: value
          }
        };
      }

      return {
        ...parsedProps,
        props: {
          ...parsedProps.props,
          [key]: value
        }
      };
    }, { sxProps: sxProp });

  const sxObject = Object.entries(toggleProps)
    .reduce((sxObject, [key]) => {
      const toggleKey = availableToggleProps[key];

      if (toggleKey.condition) {
        return {
          ...sxObject,
          ...toggleKey[toggleKey.condition(sxObject)]
        };
      }

      return {
        ...sxObject,
        ...toggleKey,
      };
    }, sxProps);

  if (props?.sx) {
    delete props.sx;
  }

  return { sxObject, props };
};
