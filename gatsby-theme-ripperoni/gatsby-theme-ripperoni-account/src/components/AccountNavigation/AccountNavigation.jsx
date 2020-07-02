/** @jsx jsx */
import { useContext } from 'react';
import { Select, jsx } from 'theme-ui';
import { navigate } from 'gatsby';

import { Box, Button, Flex, MQ } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import { CustomerContext } from '../../context/CustomerContext';

import { navLinks } from './nav-links';
import { NavigationItem } from './AccountNavigationItem';


export const AccountNavigation = ({
  path,
  ...props
}) => {
  const { logout } = useContext(CustomerContext);

  const desktopNavLinks = [
    ...navLinks,
    { label: 'Sign Out', as: Button.Link, onClick: logout },
  ];

  const activeNavLink = navLinks
    .find(({ to, paths = [] }) =>
      `/account${path}` === to || paths.includes(path));

  return (
    <Box {...props}>
      <MQ
        comps={[
          <Select
            key='mobile-navigation'
            onChange={event => navigate(event.target.value)}
            defaultValue={activeNavLink.to}
          >
            {navLinks.map(({ to, label }) => (
              <option
                key={label}
                value={to}
              >
                {label}
              </option>
            ))}
          </Select>,
          null,
          null,
          <Flex.Col key='desktop-navigation'>
            {desktopNavLinks.map(link => (
              <NavigationItem
                activeLabel={activeNavLink.label}
                key={link.label}
                {...link}
              />
            ))}
          </Flex.Col>
        ]}
      />
    </Box>
  );
};


// import Dropdown from 'react-dropdown';

// import 'react-dropdown/style.css';

// <Dropdown
//   key='mobile-dropdown'
//   options={navLinks}
//   onChange={dropdownOnChange}
//   value={activeNavLink}
//   {...props}
// />

// const dropdownOnChange = option => {
//   console.log(option, option);
// };
