import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import client from '../api/backpack';

export const useInventory = (id) => {
  const [inventory, setInventory] = useState({});

  useSubscription(GET_INVENTORY, {
    variables: {
      id: parseInt(id.split('__').pop())
    },
    client,
    onSubscriptionData: ({subscriptionData}) => {
      setInventory(subscriptionData.data.productVariant);
    },
  });

  return inventory;
};

const GET_INVENTORY = gql`
  subscription Inventory ($id: bigint!) {
    productVariant(id: $id) {
      id
      productId
      foreignId
      inventory
      available
      foreignProductHandle
    }
  }
`;