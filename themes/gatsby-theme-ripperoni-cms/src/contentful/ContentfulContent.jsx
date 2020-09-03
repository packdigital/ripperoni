/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import flatMap from 'lodash/flatMap';

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

  const marginPadding = props.marginPadding
    ?.reduce((spacings, { type, direction, value, viewport }) => {
      const key = `${type}${direction}`;

      return {
        ...spacings,
        [key]: (spacings[key] || Array(breakpoints.length + 1).fill(null))
          .map((item, index) => parseInt(viewport) === index ? parseInt(value) || value : item)
      };
    }, {});

  const otherProps = Object.entries(props)
    .filter(([name, value]) => propsList.includes(name))
    .filter(([name, value]) => Array.isArray(value))
    .filter(([name, value]) => value.some(value => value !== null))
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
    marginPadding,
  };
};

export const ContentfulContent = incomingProps => {
  const parsedProps = parseProps(incomingProps);
  const {
    type,
    Component,
    marginPadding,
    grids,
    entries,
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
        {...marginPadding}
        {...props}
      />
    );
  }

  if (type === 'ContentfulPageContainer') {
    return (
      <Component>
        {props.content.map((section, index) => (
          <ContentfulContent
            {...section}
            key={index}
          />
        ))}
      </Component>
    );
  }

  const getContent = (name, ids) => {
    return ids.map((id, index) => {
      const normalizedId = id[0] === 'c' ? id.slice(1) : id;
      const content = entries.find(({ contentful_id }) => contentful_id === normalizedId);

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
    const { content, slots } = groupBy(props.lookup, 'type');
    const groupedContent = groupBy(content, 'name');
    const groupedSlots = groupBy(slots, 'name');
    const contentWithEntries = mapValues(groupedContent, value => map(value, 'entry.sys.id'));
    const slotsWithEntries = mapValues(groupedSlots, value => map(value, 'entry.sys.id'));
    const contentNodes = Object.entries(contentWithEntries)
      .reduce((fields, [name, ids]) => ({ ...fields, [name]: getContent(name, ids) }), {});
    const slotsNodes = flatMap(slotsWithEntries, (entries, name) => getContent(name, entries));
    // eslint-disable-next-line
    const slottedContent = <SlottedContent children={slotsNodes} grids={grids} />

    return (
      <Component
        data-comp={`Contentful Content: ${Component.displayName}`}
        sx={_sx}
        {...marginPadding}
        {...contentNodes}
        {...props}
      >
        {slottedContent}
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
