import { useRef, } from 'react';
import { useThemeUI } from 'theme-ui';

/**
 * Outputs a prop array that mirrors theme-UI's responsive array behavior
 * by filling in all breakpoints/indexes with either a passed index or
 * filling a missing/null index with a duplicate of the previous index
 * For example in a project with 4 bps defined in the theme, and
 *  - input: initItems = [FlexCol, FlexRow]
 *  - output: [FlexCol, FlexRow, FlexRow, FlexRow]
 * @param {*} initItems [strings|react.components etc..]
 * @param {*} fillUntilIndex integer: If you don't want to fill all breakpoints
 * @param {*} falseReturns boolean: overwrites the returned value when the item is false
 */
export const useResponsiveProp = ({ initItems, fillUntilIndex = 0, falseReturns = null }) => {
  const context = useThemeUI();
  const breakpointCount = useRef(context.theme?.breakpoints?.length + 1|| 1);

  return [...initItems, ...Array(breakpointCount.current).fill()]
    .slice(0, fillUntilIndex === 0  ? breakpointCount.current : fillUntilIndex)
    .reduce((items, item, index) => {
      // false returns null component
      /* eslint-disable-next-line */
      if (typeof item === 'boolean' && item == false) {
        return [...items, falseReturns /*null*/];
      }
      // null returns previous
      if (item == null) {
        return [...items, items[index - 1] || falseReturns];
      }
      // return component
      return [...items, item];
    }, []);
};
