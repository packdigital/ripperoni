/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { Flex, Link, Text } from '@ripperoni/components';

import { ActiveIcon } from './AccountNavigationActiveIcon';


export const NavigationItem = ({
  as,
  label,
  variant,
  activeLabel,
  ...props
}) => {
  if (!as) {
    return (
      <Link
        data-comp={NavigationItem.displayName}
        activeClassName='active'
        sx={{ variant: variant || 'account.layout.navigation.item' }}
        animate={false}
        {...props}
      >
        <Flex
          middle
          between
        >
          <Text variant='account.text.layout.navigation'>
            {label}
          </Text>

          {activeLabel === label && <ActiveIcon />}
        </Flex>
      </Link>
    );
  }

  return (
    <Flex
      as={as}
      middle
      between
      {...props}
      variant={variant || 'account.layout.navigation.item'}
    >
      <Text variant='account.text.layout.navigation'>
        {label}
      </Text>

      {activeLabel === label && <ActiveIcon />}
    </Flex>
  );
};

NavigationItem.displayName = 'Account Navigation Item';

NavigationItem.propTypes = {
  as: PropTypes.any,
  label: PropTypes.string,
  variant: PropTypes.string,
  activeLabel: PropTypes.string,
};
