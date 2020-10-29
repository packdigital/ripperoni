/** @jsx jsx */
import { Select, jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';

import { Box, Button, Flex, MQ } from '@ripperoni/components';

import { useCustomerContext } from '../../context/CustomerContext';
import { navLinks } from './nav-links';
import { NavigationItem } from './AccountNavigationItem';

export const AccountNavigation = ({ path, ...props }) => {
  const { logoutCustomer } = useCustomerContext();

  const desktopNavLinks = [
    ...navLinks,
    {
      label: 'Sign Out',
      as: Button.Link,
      variant: 'account.layout.navigation.item',
      onClick: logoutCustomer,
    },
  ];

  const activeNavLink = navLinks.find(
    ({ to, paths = [] }) => `/account${path}` === to || paths.includes(path)
  );

  return (
    <Box
      data-comp={AccountNavigation.displayName}
      variant='account.layout.navigation'
      {...props}
    >
      <MQ
        comps={[
          <Select
            key='mobile-navigation'
            onChange={(event) => navigate(event.target.value)}
            defaultValue={activeNavLink.to}
          >
            {navLinks.map(({ to, label }) => (
              <option key={label} value={to}>
                {label}
              </option>
            ))}
          </Select>,
          null,
          null,
          <Flex.Col key='desktop-navigation'>
            {desktopNavLinks.map((link) => (
              <NavigationItem
                activeLabel={activeNavLink.label}
                key={link.label}
                {...link}
              />
            ))}
          </Flex.Col>,
        ]}
      />
    </Box>
  );
};

AccountNavigation.displayName = 'Account Navigation';

AccountNavigation.propTypes = {
  path: PropTypes.string,
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
