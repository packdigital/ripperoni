import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import xorWith from 'lodash/xorWith';

/**
 *
 *
 * @export
 * @param {object[]} arr1
 * @param {object[]} arr2
 * @returns {boolean}
 */
export function deepCompare(arr1: object[], arr2: object[]): boolean {
  return isEmpty(xorWith(arr1, arr2, isEqual));
}
