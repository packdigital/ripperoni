/* eslint-disable max-lines */
/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import flatMap from 'lodash/flatMap';

import { Box } from '@ripperoni/components';
import { components } from '@ripperoni/cms/contentful/components';

import { SlottedContent } from './SlottedContent';


const parseProps = props => {
  const { theme: { breakpoints }} = useThemeUI();
  const Component = props.__typename === 'ContentfulMolecule'
    ? components[props.component]
    : components[props.__typename];
  const propsList = [
    'color',
    'backgroundColor',
    'fontSize',
    'fontWeight',
    'maxWidth',
  ];

  const getMarginPadding = marginPadding => marginPadding
    ?.reduce((spacings, { type, direction, value, viewport }) => {
      const key = `${type}${direction}`;

      return {
        ...spacings,
        [key]: (spacings[key] || Array(breakpoints.length + 1).fill(null))
          .map((item, index) => parseInt(viewport) === index ? parseInt(value) || value : item)
      };
    }, {});

  const otherProps = Object.entries(props)
    .filter(([name]) => propsList.includes(name))
    .filter(([, value]) => Array.isArray(value))
    .filter(([, value]) => value.some(value => value !== null))
    .reduce((props, [name, value]) => {

      return {
        ...props,
        [name]: [null, ...value].map(value => value?.__typename
          ? parseInt(value[name]) || value[name]
          : value)
      };
    }, props);

  return {
    type: props.__typename,
    Component,
    ...otherProps,
    marginPadding: {
      atom: getMarginPadding(props.marginPadding),
      content: getMarginPadding(props.marginPaddingContent),
      slots: getMarginPadding(props.marginPaddingSlots),
    },
  };
};

export const ContentfulContent = incomingProps => {
  const parsedProps = parseProps(incomingProps);
  console.log('parsedProps', parsedProps);
  const {
    type,
    Component,
    marginPadding,
    grids,
    entries,
    content,
    _sx,
    ...props
  } = parsedProps;

  if (!type) {
    return null;
  }

  if (type.startsWith('ContentfulAtom')) {
    return (
      <Component
        sx={_sx}
        {...marginPadding.atom}
        {...props}
      />
    );
  }

  if (type === 'ContentfulPageContainer') {
    return (
      <Component>
        {content.map((section, index) => (
          <ContentfulContent
            {...section}
            key={index}
          />
        ))}
      </Component>
    );
  }

  const getContent = (name, ids, inGrid) => {
    return ids.map((id, index) => {
      const normalizedId = id[0] === 'c' ? id.slice(1) : id;
      const content = entries.find(({ contentful_id }) => contentful_id === normalizedId);

      if (inGrid) {
        return (
          <Box
            gridArea={name}
            key={Math.random()}
          >
            <ContentfulContent
              {...content}
            />
          </Box>
        );
      }

      return (
        <ContentfulContent
          {...content}
          key={`${index}+${id}`}
        />
      );
    });
  };

  if (type === 'ContentfulMolecule') {
    const { content, slots } = groupBy(props.lookup, 'type');
    const groupedContent = groupBy(content, 'name');
    const groupedSlots = groupBy(slots, 'name');
    const contentWithEntries = mapValues(groupedContent, value => map(value, 'entry.sys.id'));
    const slotsWithEntries = mapValues(groupedSlots, value => map(value, 'entry.sys.id'));
    const contentNodes = Object.entries(contentWithEntries)
      .reduce((fields, [name, ids]) => ({ ...fields, [name]: getContent(name, ids) }), {});
    const slotsNodes = flatMap(slotsWithEntries, (entries, name) => getContent(name, entries, true));

    return (
      <Component
        data-comp={`Contentful Content: ${Component?.displayName || '???'}`}
        sx={_sx}
        fromCms={true}
        {...marginPadding.content}
        {...contentNodes}
        {...props}
      >
        <SlottedContent
          {...marginPadding.slots}
          slotsNodes={slotsNodes}
          grids={grids}
        />
      </Component>
    );
  }

  return null;
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
