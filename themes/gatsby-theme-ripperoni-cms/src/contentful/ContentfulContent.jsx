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
  marginPadding,
  grids,
  entries: entryComponents,
  lookup,
  _sx,
  __typename: type,
  ...props
}) => {
  if (!type) {
    return null;
  }

  const Component = type === 'ContentfulMolecule'
    ? components[component]
    : components[type];

  const getContent = (name, entries) => {
    return entries.map(({ sys: { id }}, index) => {
      const normalizedId = id[0] === 'c' ? id.slice(1) : id;
      const content = entryComponents.find(({ contentful_id }) => contentful_id === normalizedId);

      return (
        <ContentfulContent
          gridArea={name}
          {...content}
          key={`${index}+${id}`}
        />
      );
    });
  };

  const parsedMarginPadding = marginPadding
    ?.map(({ type, direction, ...rest }) => ({
      ...rest,
      key: `${type}${direction}`,
    }));
  const groupedMarginPadding = groupBy(parsedMarginPadding, 'key');
  const marginPaddingProps = mapValues(groupedMarginPadding, group => {
    return group.reduce((breakpoints, { viewport, value }) => {
      if (viewport === 'desktop') {
        breakpoints[5] = value.replace('theme.space.', '');
      }
      if (viewport === 'tablet') {
        breakpoints[3] = value.replace('theme.space.', '');
      }
      if (viewport === 'mobile' || viewport === 'all') {
        breakpoints[0] = value.replace('theme.space.', '');
      }
      return breakpoints;
    }, []);
  });

  if (type === 'ContentfulMolecule') {
    const { content, slots } = groupBy(lookup, 'type');
    const groupedContent = groupBy(content, 'name');
    const groupedSlots = groupBy(slots, 'name');
    const contentWithEntries = mapValues(groupedContent, value => map(value, 'entry'));
    const slotsWithEntries = mapValues(groupedSlots, value => map(value, 'entry'));

    console.log('grids', grids);
    const parsedGrids = grids?.reduce((parsedGrids, { viewport, grid }) => {
      return {
        ...parsedGrids,
        [`${viewport}Grid`]: grid
      };
    }, {});

    const contentNodes = mapValues(contentWithEntries, (entries, name) => getContent(name, entries));
    const slotsNodes = flatMap(slotsWithEntries, (entries, name) => getContent(name, entries));

    console.log('contentWithEntries', contentWithEntries);


    const slottedContentProps = {
      ...parsedGrids,
      children: slotsNodes
    };
      console.log('slottedContentProps', slottedContentProps);

    return (
      <Component
        _content={<SlottedContent {...slottedContentProps} />}
        sx={_sx}
        {...contentNodes}
        {...marginPaddingProps}
        {...props}
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


// const getContent = ({ name, entries }, group) => {
//   return entries.map(({ sys: { id }}, index) => {
//     const normalizedId = id[0] === 'c' ? id.slice(1) : id;
//     const content = group.find(({ contentful_id }) => contentful_id === normalizedId);

//     return (
//       <ContentfulContent
//         gridArea={name}
//         {...content}
//         key={`${index}+${id}`}
//       />
//     );
//   });
// };


// const contentNodes = lookupContent
//   .reduce((fields, field) => ({
//     ...fields,
//     [field.name]: getContent(field, content)
//   }), {});

// const slotsNodes = lookupSlots
//   .reduce((slotContent, slot) => [
//     ...slotContent,
//     ...getContent(slot, slots)
//   ], []);
