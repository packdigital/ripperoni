import chalk from 'chalk';
import get from 'lodash/get';

/**
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
  const isPreviewEnvironment = process.env.PREVIEW === 'true';
  const missingOptions = requiredOptions
    .map((requiredOption) =>
      typeof requiredOption === 'string'
        ? [requiredOption, get(options, requiredOption)]
        : Object.entries(requiredOption)[0]
    )
    .filter((requiredOption) => requiredOption[1] === undefined)
    .map((requiredOption) => requiredOption[0])
    .join(', ');

  if (isEnabled && !missingOptions && (!isPreviewEnvironment || previewable)) {
    return [{ options, resolve }];
  }

  const getTrueFalse = (value: boolean) =>
    value ? chalk`{bold {green true}}` : chalk`{bold {red false}}`;

  console.warn(chalk`{bold {magenta ${resolve}}} not included:`);
  console.warn(chalk`  {bold •} theme: ${theme && chalk`{bold {cyan ${theme}}}`}`);
  console.warn(chalk`  {bold •} enabled: ${getTrueFalse(isEnabled)}`);
  console.warn(chalk`  {bold •} missing option(s): {bold ${missingOptions}}`);
  console.warn(chalk`  {bold •} can preview: ${getTrueFalse(previewable)}`);

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
