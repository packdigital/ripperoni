import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Heading } from '@ripperoni/components';


export const LoggedInPageHeader = ({
  heading,
  children,
  ...props
}) => {
  return (
    <Flex
      between
      middle
      variant='pages.account.loggedInPageHeader'
      {...props}
    >
      {typeof heading !== 'string'
        ? children
        : (
          <Heading variant='text.account.loggedInPageHeader.heading'>
            {heading}
          </Heading>
        )
      }
    </Flex>
  );
};

LoggedInPageHeader.displayName = 'Logged In Page Header';

LoggedInPageHeader.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.any
};
