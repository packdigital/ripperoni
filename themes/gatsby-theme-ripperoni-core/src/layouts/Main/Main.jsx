import React from 'react';
import PropTypes from 'prop-types';


export const Layout = props => (
  <div data-comp={Layout.displayName}>{props.children}</div>
);

Layout.displayName = 'Main Layout';

Layout.propTypes = {
  children: PropTypes.node,
};
