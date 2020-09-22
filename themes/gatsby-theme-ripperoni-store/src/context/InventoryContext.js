import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { isBrowser, useContextFactory } from '@packdigital/ripperoni-utilities';

import client from '../api/backpack';

const InventoryContext = createContext();

export const useInventoryContext = useContextFactory('Inventory', InventoryContext);

const convertToGatsbyGraphQLId = (id, type, prefix) => {
  return !id ? null : !type ? id : `${prefix}__${type}__${id}`;
}

export const InventoryContextProvider = ({ children }) => {
  const [paused, setPaused] = useState(false);
  const [inventory, setInventory] = useState({});

  useSubscription(GET_ALL_INVENTORY, {
    client,
    paused,
    onSubscriptionData: ({subscriptionData}) => {
      const normalizedInventoryData = subscriptionData.data.productVariants
        .reduce((acc, {id, ...inventoryData}) => {
          const variantId = convertToGatsbyGraphQLId(id, 'ProductVariant', 'Backpack');

          return {
            ...acc,
            [variantId]: {
              ...acc[variantId],
              ...inventoryData,
            }
          };
        }, {});

      setInventory(normalizedInventoryData);
    },
  });

  return (
    <InventoryContext.Provider value={{
      setPaused,
      inventory
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

InventoryContextProvider.displayName = 'Inventory Context Provider';

InventoryContextProvider.propTypes = {
  children: PropTypes.any
};


const GET_ALL_INVENTORY = gql`
  subscription GetAllInventories {
    productVariants(order_by: {id: asc}) {
      id
      productId
      foreignId
      inventory
      available
    }
  }
`;
