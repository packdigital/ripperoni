import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@ripperoni/components';
import { components } from '@ripperoni/cms/contentful/components';


export const ContentfulContent = ({
  __typename: type,
  component,
  layout,
  layoutMobile,
  content,
  slots,
  lookup,
  atoms,
  ...props
}) => {
  if (!type) {
    return null;
  }

  const Component = ['ContentfulMolecule', 'ContentfulMoleculeTest'].includes(type)
    ? components[component]
    : components[type];

  if (type === 'ContentfulMoleculeTest') {

    const getContent = ({ name, value: { sys: { id }}}, group) => {
      const normalizedId = id[0] === 'c' ? id.slice(1) : id;
      const atom = group.find(({ contentful_id }) => contentful_id === normalizedId);

      return (
        <ContentfulContent
          key={atom.id}
          gridArea={name}
          {...atom}
        />
      );
    };

    const rows = layout.split("' '").length;
    const rowsMobile = layoutMobile.split("' '").length;
    const columns = layout.split("' '")[0].split(' ').length;
    const columnsMobile = layoutMobile.split("' '")[0].split(' ').length;

    const contentNodes = lookup.content
      .reduce((fields, field) => ({ ...fields, [field.name]: getContent(field, content) }), {});
    const slotsNodes = lookup.slots
      .reduce((slotContent, slot) => [ ...slotContent, getContent(slot, slots) ], []);

    const SlottedContent = () => (
      <Grid
        gridTemplateColumns={[`repeat(${columnsMobile}, 1fr)`, null, null, `repeat(${columns}, 1fr)`]}
        gridTemplateRows={[`repeat(${rowsMobile}, auto)`, null, null, `repeat(${rows}, auto)`]}
        gridTemplateAreas={[layoutMobile, null, null, layout]}
      >
        {slotsNodes}
      </Grid>
    );

    return (
      <Component
        _content={<SlottedContent />}
        {...contentNodes}
      />
    );
  }

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
  layout: PropTypes.string,
  layoutMobile: PropTypes.string,
  content: PropTypes.object,
  slots: PropTypes.object,
  lookup: PropTypes.object,
  atoms: PropTypes.arrayOf(PropTypes.object),
};
