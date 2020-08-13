/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { components } from '@ripperoni/cms/contentful/components';

import { SlottedContent } from './SlottedContent';


export const ContentfulContent = ({
  __typename: type,
  component,
  layout,
  layoutMobile,
  content,
  slots,
  lookup,
  atoms,
  _sx,
  ...props
}) => {
  if (!type) {
    return null;
  }

  const Component = ['ContentfulMolecule', 'ContentfulMoleculeTest'].includes(type)
    ? components[component]
    : components[type];

  const getContent = (entry, group) => {
    const { id } = entry.value.sys;
    const normalizedId = id[0] === 'c' ? id.slice(1) : id;
    const atom = group.find(({ contentful_id }) => contentful_id === normalizedId);

    return (
      <ContentfulContent
        key={atom.id}
        gridArea={entry.name}
        {...atom}
      />
    );
  };


  if (type === 'ContentfulMoleculeTest') {
    const contentNodes = lookup.content
      .reduce((fields, field) => ({ ...fields, [field.name]: getContent(field, content) }), {});
    const slotsNodes = lookup.slots
      .reduce((slotContent, slot) => [ ...slotContent, getContent(slot, slots) ], []);
    const slottedContentProps = { layout, layoutMobile, lookup, slots, children: slotsNodes };

    return (
      <Component
        _content={<SlottedContent {...slottedContentProps} />}
        sx={_sx}
        {...contentNodes}
        {...props}
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

    return (
      <Component
        _content={content}
        sx={_sx}
        {...props}
      />
    );
  }

  return (
    <Component
      sx={_sx}
      {...props}
    />
  );
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
  _sx: PropTypes.object,
};
