import chalk from 'chalk';

/**
 * Returns a function that returns a optionally colorized messaged prepended with an optionally colorize prefix.
 *
 * @export
 * @param {string} [prefix='']
 * @param {string} [color='black']
 * @returns {*}
 */
export function formatMessage(
  prefix = '',
  color = 'black'
): (message: string, color2: string) => string {
  return (message: string, color2 = 'black'): string =>
    chalk`{${color} ${prefix}} {${color2} ${message}}`.trim();
}
