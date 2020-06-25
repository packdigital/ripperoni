import chalk from 'chalk';
import get from 'lodash/get';
import has from 'lodash/has';

/**
 *
 *
 * @export
 * @param {string} id
 * @returns {string}
 */
export function conditionallyIncludePlugin({
  resolve,
  options = {},
  theme = '',
  requiredOptions = [],
  defaultOptions = {},
  previewable = true,
  enabled: isEnabled = true
}: ConditionallyIncludePluginArguments): GatsbyPlugin[] {
  const themeName = chalk`{cyan ${theme}}`;
  const pluginName = chalk`{magenta ${resolve}}`;
  const prefix = `${pluginName}${theme ? ` in ${themeName}` : ''}`;
  const isPreviewable = process.env.PREVIEW === 'true' && !previewable ? false : true;
  const mergedOptions = { ...defaultOptions, ...options };
  const missingOptions = requiredOptions
    .filter(
      requiredOption =>
        !has(mergedOptions, requiredOption) || get(mergedOptions, requiredOption) === undefined
    )
    .map(option => chalk`{bold ${option}}`)
    .join(', ');

  if (isEnabled && !missingOptions && isPreviewable) {
    return [{ options: mergedOptions, resolve }];
  }

  console.warn(`${prefix} not included:`);

  if (!isEnabled) {
    console.warn(chalk`  - option {bold enabled} set to {red false}`);
  }

  if (missingOptions) {
    console.warn(`  - missing option(s): ${missingOptions}`);
  }

  if (!isPreviewable) {
    console.warn(chalk`  - env is {bold PREVIEW} and {bold preview} is {red false}`);
  }

  return [];
}

export interface GatsbyPlugin {
  resolve: string;
  options: PluginOptions;
}

export interface PluginOptions {
  [key: string]: object;
}

export interface ConditionallyIncludePluginArguments {
  resolve: string;
  options: PluginOptions;
  theme?: string;
  requiredOptions?: string[];
  defaultOptions?: PluginOptions;
  previewable?: boolean;
  enabled?: boolean;
}
