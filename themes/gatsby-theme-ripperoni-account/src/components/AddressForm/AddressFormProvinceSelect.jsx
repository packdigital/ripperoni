/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'theme-ui';
import { Countries } from 'country-and-province';


export const ProvinceSelect = ({
  country,
  ...props
}) => {
  const provinceValues = Countries.byName(country)?.provinces?.data;

  return (
    <Select {...props}>
      {provinceValues
        .map(({ name, code }) => [name, code])
        .map(([label, value]) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))
      }
    </Select>
  );
};
