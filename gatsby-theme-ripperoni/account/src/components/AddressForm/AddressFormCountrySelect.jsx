/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'theme-ui';


export const CountrySelect = ({
  countries,
  ...props
}) => {
  const countryValues = countries || [['United States', 'US']];

  return (
    <Select {...props}>
      {countryValues.map(([label, value]) => (
        <option
          value={value}
          key={value}
        >
          {label}
        </option>
      ))}
    </Select>
  );
};
