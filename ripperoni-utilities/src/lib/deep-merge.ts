import arrayUnion from 'array-union';
import deepmerge from 'deepmerge';

/**
 *
 *
 * @export
 * @param {object} obj1
 * @param {object} obj2
 * @returns {object}
 */
export function deepMerge(...objects: object[]): object {
  const arrayMerge = (destination: string[], source: string[]): string[] => {
    return arrayUnion(destination, source);
  };

  return deepmerge.all(objects, { arrayMerge });
}
