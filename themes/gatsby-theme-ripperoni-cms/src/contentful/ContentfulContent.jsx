/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import { components } from '@ripperoni/cms/contentful/components';

import { SlottedContent } from './SlottedContent';


export const ContentfulContent = ({
  __typename: type,
  component,
  gridDesktop,
  gridMobile,
  content,
  slots,
  lookupContent,
  lookupSlots,
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

  const getContent = ({ name, entries }, group) => {
    return entries.map(({ sys: { id }}, index) => {
      const normalizedId = id[0] === 'c' ? id.slice(1) : id;
      const content = group.find(({ contentful_id }) => contentful_id === normalizedId);

      return (
        <ContentfulContent
          gridArea={name}
          {...content}
          key={`${index}+${id}`}
        />
      );
    });

  };


  if (type === 'ContentfulMoleculeTest') {
    const contentNodes = lookupContent
      .reduce((fields, field) => ({ ...fields, [field.name]: getContent(field, content) }), {});
    const slotsNodes = lookupSlots
      .reduce((slotContent, slot) => [ ...slotContent, ...getContent(slot, slots) ], []);
    const slottedContentProps = { gridDesktop, gridMobile, children: slotsNodes };

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
  gridDesktop: PropTypes.string,
  gridMobile: PropTypes.string,
  content: PropTypes.array,
  slots: PropTypes.array,
  lookupContent: PropTypes.array,
  lookupSlots: PropTypes.array,
  atoms: PropTypes.arrayOf(PropTypes.object),
  _sx: PropTypes.object,
};
