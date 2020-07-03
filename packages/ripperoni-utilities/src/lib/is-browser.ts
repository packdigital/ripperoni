// consider using component approach <ClientOnly></ClientOnly> instead
//
// https://joshwcomeau.com/react/the-perils-of-rehydration/#the-solution

/**
 *
 *
 * @export
 */
export const isBrowser = typeof window !== 'undefined';
