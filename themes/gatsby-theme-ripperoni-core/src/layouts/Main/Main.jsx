import React from 'react';
import PropTypes from 'prop-types';


export const Layout = props => (
  <div data-comp={Main.displayName}>{props.children}</div>
);

Main.displayName = 'Main Layout';

Main.propTypes = {
  children: PropTypes.node,
};
