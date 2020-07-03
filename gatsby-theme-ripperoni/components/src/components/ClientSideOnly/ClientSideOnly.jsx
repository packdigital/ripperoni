import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { useHasMounted } from '../../hooks/useHasMounted';

// Get the most accurate displayName of the child that will be CSR
const firstChildDisplayName = children => {
  const { props, type } = Children.toArray(children)[0];

  return props['data-comp'] || type.displayName || 'unknown';
};

export const ClientSideOnly = props => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <div
        data-comp={ClientSideOnly.displayName}
        data-comp-csr={firstChildDisplayName(props.children)}
      />
    );
  };

  return (
    <div
      data-comp={ClientSideOnly.displayName}
      {...props}
    />
  );
};

ClientSideOnly.displayName = 'Client Side Only';

ClientSideOnly.propTypes = {
  children: PropTypes.any
};
