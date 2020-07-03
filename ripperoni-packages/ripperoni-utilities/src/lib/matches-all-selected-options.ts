import { SelectedOptions } from '../types/backpack';

/**
 *
 *
 * @export
 * @param {SelectedOptions} from
 * @param {SelectedOptions} to
 * @param {string[]} ignore [[]=[]]
 * @returns {boolean}
 */
export function matchesAllSelectedOptions(
  from: SelectedOptions,
  to: SelectedOptions,
  ignore: string[] = []
): boolean {
  return Object.entries(from).every(
    ([name, value]: [string, string | number]): boolean =>
      ignore.includes(name) || to[name] === value
  );
}
