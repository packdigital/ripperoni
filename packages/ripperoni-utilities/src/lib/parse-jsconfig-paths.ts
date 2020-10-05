import path from 'path';

/**
 * @export
 * @param {object} jsconfig
 * @returns {object | undefined}
 */

interface Jsconfig {
  compilerOptions: compilerOptions;
  [key: string]: any;
}

interface compilerOptions {
  [key: string]: any;
}

interface Options {
  type: string;
  absolute: boolean;
  [key: string]: any;
}

export function parseJsConfigPaths(
  jsconfig: Jsconfig | undefined,
  options: Options = { type: 'object', absolute: true }
): object | undefined {
  const paths: string = jsconfig?.compilerOptions?.paths;

  if (!paths) {
    return;
  }

  const removeStarSlash = (str: string): string => str.replace('/*', '');
  const removeStarSlashes = ([a, p]: string[]): string[] => [
    removeStarSlash(a),
    p[0][0] === '@'
      ? removeStarSlash(p[0])
      : options.absolute
      ? path.join(process.cwd(), removeStarSlash(p[0]))
      : removeStarSlash(p[0]),
  ];

  if (options.type === 'array') {
    return Object.entries(paths).map(removeStarSlashes);
  }

  return Object.fromEntries(Object.entries(paths).map(removeStarSlashes));
}
