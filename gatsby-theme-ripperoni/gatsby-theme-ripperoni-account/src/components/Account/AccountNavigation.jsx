/** @jsx jsx */
import { useState } from 'react';
import { Box, Button, Heading, Text, jsx } from 'theme-ui';

import { FlexCol, FlexRow } from '@theme2/components';

import Link from '@theme/components/Link';
import MQ from '@theme/components/MQ';
import useGlobal from '@theme/store';
import useCustomer from '@theme/hooks/useCustomer';

import LeftArrow from '@assets/images/left-arrow-icon.svg';


export const AccountNavigation = props => {
  const { logout } = useCustomer();
  const [{ customer }] = useGlobal();

  const navLinks = [
    { children: 'Order History', to: '/', paths: ['/orders/:id'] },
    { children: 'Address Book', to: '/addresses' },
    { children: 'Sign Out', onClick: logout },
  ];

  return (
    <FlexCol {...props}>
      <FlexCol mb={[7, null, null, null, 12]}>
        <Heading mb={1}>{`Hey ${customer.firstName}` || 'Hello!'}</Heading>

        <Text
          variant='text.m'
          color='darkgray'
        >
          {customer.email}
        </Text>
      </FlexCol>

      <FlexCol mb={[7, null, null, null, 12]}>
        <MQ comps={[
          <Dropdown
            links={navLinks}
            path={props.path}
            key='dropdown'
          />,
          null,
          null,
          null,
          navLinks.map((link, index) => (
            <AccountLink
              path={props.path}
              paths={link.paths}
              key={index}
              {...link}
            />
          ))
        ]}
        />
      </FlexCol>

      <FlexCol sx={{ display: ['none', null, null, null, 'flex'] }}>
        <Text variant='text.s'>Need Help?</Text>

        <Link
          href='mailto:info@cutsclothing.com'
          sx={{ color: 'darkgray' }}
        >
          info@cutsclothing.com
        </Link>
      </FlexCol>
    </FlexCol>
  );
};

const AccountLink = ({
  to,
  path,
  paths = [],
  enabled = true,
  closeDropdown = () => {},
  ...props
}) => {
  const isActive = to === path || paths.includes(path);

  if (!enabled) return null;

  return (
    <FlexRow
      middle
      between
      as={to ? Link : Button}
      to={`/account/${to}`}
      className='is-active'
      sx={{
        variant: to ? 'text.s' : 'buttons.text',
        py: 6,
        textDecoration: 'none',
        borderBottom: isActive
          ? '2px solid black'
          : '1px solid lightgray',
        '&:hover': { bg: 'transparent' }
      }}
      onClick={closeDropdown}
      {...props}
    >
      <Text variant='text.s'>{props.children}</Text>

      {isActive && (
        <LeftArrow
          sx={{
            width: 15,
            height: 15,
            transform: 'rotate(180deg)'
          }}
        />
      )}
    </FlexRow>
  );
};

const Dropdown = ({ links, path, ...props  }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          variant: 'text.s',
          ...dropdownBoxSx,
          ...dropdownChevronSx,
        }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        Order History
      </Box>

      <Box
        sx={{
          top: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: 1,
          display: dropdownOpen ? 'block' : 'none',
        }}
      >
        {links.map((props, index) =>
          <AccountLink
            path={path}
            paths={props.paths}
            sx={dropdownBoxSx}
            closeDropdown={closeDropdown}
            key={index}
            {...props}
          />
        )}
      </Box>
    </Box>
  );
};

export default AccountNavigation;

const dropdownBoxSx = {
  width: '100%',
  display: 'block',
  p: '8px',
  bg: 'white',
  cursor: 'pointer',
  position: 'relative',
  border: '1px solid darkgray',
  textAlign: 'left',
  'svg': { display: 'none' },
  '&:hover': { bg: 'lightgray' },
  '&.active': { bg: 'gray' }
};

const dropdownChevronSx = {
  '&::after': {
    content: '" "',
    display: 'block',
    position: 'absolute',
    top: '50%',
    right: '15px',
    marginTop: '-3px',
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: '5px 5px 0',
    borderColor: 'gray transparent transparent',
  }
};
