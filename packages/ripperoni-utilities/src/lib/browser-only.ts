// consider using component approach <ClientOnly></ClientOnly> instead
//
// https://joshwcomeau.com/react/the-perils-of-rehydration/#the-solution

/**
 *
 *
 * @export
 */
export function browserOnly(fn: (...args: any[]) => any): any {
  if (typeof window !== 'undefined') {
    return fn();
  }

  return;
}
