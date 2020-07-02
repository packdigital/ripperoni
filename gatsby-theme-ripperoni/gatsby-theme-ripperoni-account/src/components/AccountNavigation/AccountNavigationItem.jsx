/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Flex, Link, Svg, Text } from '@packdigital/gatsby-theme-ripperoni-components/src/components';

import Arrow from '../../assets/images/arrow.svg';


export const NavigationItem = ({
  as,
  label,
  activeLabel,
  ...props
}) => {
  if (!as) {
    return (
      <Link
        {...props}
        activeClassName='active'
        sx={{ variant: 'layout.account.navigationItem' }}
      >
        <Flex
          middle
          between
        >
          <Text variant='text.account.navigation'>
            {label}
          </Text>

          {activeLabel === label && (
            <Svg
              as={Arrow}
              width='15px'
              transform='scale(-1)'
            />
          )}
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
      variant='layout.account.navigationItem'
    >
      <Text variant='text.account.navigation'>
        {label}
      </Text>
    </Flex>
  );
};
