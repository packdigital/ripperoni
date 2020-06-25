import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';

/**
 * Converts `string` to [title case](https://en.wikipedia.org/wiki/Letter_case#Title_case).
 *
 * @export
 * @category String
 * @param {string} [input=''] The string to convert.
 * @returns {string} Returns the title cased string.
 * @see startCase, camelCase
 * @example
 *
 * ```js
 * titleCase('foo bar')
 * // => 'Foo Bar'
 *
 * titleCase('--foo-bar--')
 * // => 'Foo Bar'
 * ```
 */
export function titleCase(input: string): string {
  return startCase(camelCase(input));
}
