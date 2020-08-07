import React from 'react';
import PropTypes from 'prop-types';

import { components } from '@ripperoni/cms/contentful/components';


export const ContentfulContent = ({
  __typename: type,
  component,
  atoms,
  ...props
}) => {
  if (!type) {
    return null;
  }

  const Component = type === 'ContentfulMolecule'
    ? components[component]
    : components[type];

  if (type === 'ContentfulMolecule') {
    const content = atoms.map((atom, index) => (
      <ContentfulContent
        key={index}
        {...atom}
      />
    ));

    return <Component _content={content} />;
  }

  return <Component {...props} />;
};

ContentfulContent.displayName = 'Contentful Content';

ContentfulContent.propTypes = {
  __typename: PropTypes.string,
  component: PropTypes.string,
  atoms: PropTypes.arrayOf(PropTypes.object),
};
