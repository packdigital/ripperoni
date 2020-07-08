import { useContext } from 'react';

/**
 *
 *
 * @export
 * @param {string} id
 * @returns {string}
 */
export function useContextFactory(name: string, context: React.Context<any>): () => any {
  return () => {
    const contextValue: any = useContext(context);

    if (contextValue === undefined) {
      throw new Error(`use${name}Context must be used within a ${name}ContextProvider.`);
    }

    return contextValue;
  };
}
