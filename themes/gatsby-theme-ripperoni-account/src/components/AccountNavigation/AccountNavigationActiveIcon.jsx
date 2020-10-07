import React from 'react';

import { Svg } from '@ripperoni/components';

import Arrow from '../../assets/arrow.svg';


export const ActiveIcon = props => {
  return (
    <Svg
      as={Arrow}
      width='15px'
      transform='scale(-1)'
      {...props}
    />
  );
};
