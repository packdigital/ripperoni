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
  previewable = true,
  enabled: isEnabled = true,
}: ConditionallyIncludePluginArguments): GatsbyPlugin[] {
  const themeName = chalk`{cyan ${theme}}`;
  const pluginName = chalk`{magenta ${resolve}}`;
  const prefix = `${pluginName}${theme ? ` in ${themeName}` : ''}`;
  const isPreviewable = process.env.PREVIEW === 'true' && !previewable ? false : true;
  const missingOptions = requiredOptions
    .filter(
      (requiredOption) =>
        !has(options, requiredOption) || get(options, requiredOption) === undefined
    )
    .map((option) => chalk`{bold ${option}}`)
    .join(', ');

  if (isEnabled && !missingOptions && isPreviewable) {
    return [{ options, resolve }];
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
  previewable?: boolean;
  enabled?: boolean;
}
