import { OptionValues, ProductVariant } from '../types/backpack';

/**
 *
 *
 * @export
 * @param {string} option
 * @param {*} optionValues
 * @returns
 */
export function sortVariantsBy(
  option: string,
  optionValues: OptionValues
): (a: ProductVariant, b: ProductVariant) => number {
  return (a: ProductVariant, b: ProductVariant): number => {
    const values = optionValues[option];
    const aSearchValue = a.selectedOptions[option];
    const bSearchValue = b.selectedOptions[option];
    const result = values.indexOf(aSearchValue) - values.indexOf(bSearchValue);

    return values ? result : 0;
  };
}
