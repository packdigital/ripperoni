/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import flatMap from 'lodash/flatMap';


import { components } from '@ripperoni/cms/contentful/components';

import { SlottedContent } from './SlottedContent';


export const ContentfulContent = ({
  component,
  marginPadding = [],
  grids,
  entries,
  lookup,
  _sx,
  __typename: type,
  ...props
}) => {
  if (!type) {
    console.log('type', type);
    console.log('props', props);
    console.log('grids', grids);
    console.log('entries', entries);
    console.log('lookup', lookup);
    console.log('component', component);

    return null;
  }

  // console.log('component', component);
  const Component = type === 'ContentfulMolecule'
    ? components[component]
    : components[type];

  const breakpointMap = {
    desktop: 5,
    tablet: 3,
    mobile: 0,
    all: 0,
  };

  const marginPaddingProps = marginPadding
    .reduce((props, { type, value, direction, viewport }) => {
      const key = `${type}${direction}`;

      if (!props[key]) {
        props[key] = [];
      }

      props[key][breakpointMap[viewport]] = value.replace('theme.space.', '');

      return props;
    }, {});

  const getContent = (name, ids) => {
    return ids.map((id, index) => {
      const normalizedId = id[0] === 'c' ? id.slice(1) : id;
      const content = entries.find(({ contentful_id }) => contentful_id === normalizedId);

      // return ContentfulContent({ ...content, gridArea: name, key: `${index}+${id}` });
      return (
        <ContentfulContent
          gridArea={name}
          {...content}
          key={`${index}+${id}`}
        />
      );
    });
  };

  if (type === 'ContentfulMolecule') {
    const { content, slots } = groupBy(lookup, 'type');
    const groupedSlots = groupBy(slots, 'name');
    const groupedContent = groupBy(content, 'name');
    const slotsWithEntries = mapValues(groupedSlots, value => map(value, 'entry.sys.id'));
    const contentWithEntries = mapValues(groupedContent, value => map(value, 'entry.sys.id'));

    const contentNodes = Object.entries(contentWithEntries)
      .reduce((fields, [name, ids]) => ({ ...fields, [name]: getContent(name, ids) }), {});
    // const contentNodes = mapValues(contentWithEntries, (entries, name) => getContent(name, entries));

    const slotsNodes = flatMap(slotsWithEntries, (entries, name) => getContent(name, entries));
    const slottedContentProps = { grids, children: slotsNodes };

    const componentProps = {
      sx: _sx,
      ...(slotsNodes.length ? { _content: <SlottedContent {...slottedContentProps} /> } : {}),
      ...(Object.keys(contentNodes).length ? contentNodes : {}),
      ...marginPaddingProps,
      ...props
    };

        // console.log('Component', Component);
        // console.log('componentProps', componentProps);
    return (
      <Component
        // sx={_sx}
        // _content={<SlottedContent {...slottedContentProps} />}
        // {...contentNodes}
        // {...marginPaddingProps}
        // {...props}
        {...componentProps}
      />
    );
  }

  return (
    <Component
      sx={_sx}
      {...marginPaddingProps}
      {...props}
    />
  );
};

ContentfulContent.displayName = 'Contentful Content';

ContentfulContent.propTypes = {
  component: PropTypes.string,
  grids: PropTypes.arrayOf(PropTypes.object),
  lookup: PropTypes.arrayOf(PropTypes.object),
  entries: PropTypes.arrayOf(PropTypes.object),
  marginPadding: PropTypes.arrayOf(PropTypes.object),
  atoms: PropTypes.arrayOf(PropTypes.object),
  _sx: PropTypes.object,
  __typename: PropTypes.string,
};
