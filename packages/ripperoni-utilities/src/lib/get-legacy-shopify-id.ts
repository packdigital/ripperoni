import { atob } from 'abab';
import isBase64 from 'is-base64';

/**
 *
 *
 * @export
 * @param {string} id
 * @returns {string}
 */
export function getLegacyShopifyId(id: string): number {
  const decodedId = atob(id) || '';
  const rawId = isBase64(id) ? decodedId : id;
  const result = rawId.replace(/^.*\/(\d*)\??.*?$/, '$1');

  return parseInt(result, 10);
}
