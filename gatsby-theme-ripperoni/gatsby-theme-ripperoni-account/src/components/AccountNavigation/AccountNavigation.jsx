import React, { useContext } from 'react';
import Dropdown from 'react-dropdown';

import { Flex, Link, MQ, Svg, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';


import Arrow from '../../assets/images/arrow.svg';
import { CustomerContext } from '../../context/CustomerContext';

import 'react-dropdown/style.css';


export const AccountNavigation = ({
  path,
  ...props
}) => {
  console.log('props', props);
  const navLinks = [
    { label: 'Order History', value: '/', paths: ['/orders/:id'] },
    { label: 'Address Book', value: '/addresses' },
    { label: 'Sign Out', value: '/logout' },
  ];

  const activeNavLink = navLinks.find(({ value, paths = [] }) => path === value  || paths.includes(path));
  console.log('activeNavLink', activeNavLink);

  const dropdownOnChange = option => {
    console.log(option, option);
  };


  return (
    <MQ
      comps={[
        <Dropdown
          key='mobile-dropdown'
          options={navLinks}
          onChange={dropdownOnChange}
          value={activeNavLink}
        />,
        <Flex.Col key='desktop-navigation'>
          {navLinks.map(link => (
            <Flex
              middle
              betwen
              as={Link}
              to={`/account${link.value}`}
              key={link.value}
            >
              <Text variant='text.s'>{link.label}</Text>

              {activeNavLink.value === link.value && (
                <Svg as={Arrow} />
              )}
            </Flex>
          ))}
        </Flex.Col>
      ]}
    />
  );
};
