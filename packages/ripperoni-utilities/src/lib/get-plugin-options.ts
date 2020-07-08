import deepmerge from 'deepmerge';

/**
 *
 *
 * @export
 * @param {object} defaults
 * @param {object} themeOptions
 * @returns
 */
export function getPluginOptions(
  defaults: Defaults,
  themeOptions: ThemeOptions
): (optionKey: string) => PluginOptions {
  return (optionKey: string): PluginOptions => {
    const defaultOptions = defaults[optionKey] || {};
    const options = themeOptions[optionKey] || {};

    return deepmerge(defaultOptions, options);
  };
}

interface Defaults {
  [key: string]: any;
}

interface ThemeOptions {
  [key: string]: any;
}

interface PluginOptions {
  [key: string]: any;
}
