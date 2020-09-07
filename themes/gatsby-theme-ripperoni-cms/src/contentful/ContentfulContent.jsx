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


const getMarginPadding = marginPadding => {
  const { theme: { breakpoints }} = useThemeUI();

  return marginPadding?.reduce((spacings, { type, direction, value, viewport }) => {
    const key = `${type}${direction}`;

    return {
      ...spacings,
      [key]: (spacings[key] || Array(breakpoints.length + 1).fill(null))
        .map((item, index) => parseInt(viewport) === index ? parseInt(value) || value : item)
    };
  }, {});
};


const parseProps = props => {
  const Component = props.__typename === 'ContentfulMolecule'
    ? components[props.component]
    : components[props.__typename];
  const propsList = [
    'color',
    'backgroundColor',
    'fontSize',
    'fontWeight',
    'textAlign',
    'maxWidth',
  ];

  const otherProps = Object.entries(props)
    .filter(([name]) => propsList.includes(name))
    .filter(([, value]) => Array.isArray(value))
    .filter(([, value]) => value.some(value => value !== null))
    .reduce((props, [name, value]) => {

      return {
        ...props,
        [name]: value.map(value => value?.__typename
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
  const {
    type,
    Component,
    marginPadding,
    grids,
    entries,
    content,
    inSlot,
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

  const getContent = ({ name, ids, inGrid }) => {

    if (inGrid) {
      return (
        <Box
          gridArea={name}
          // {...getMarginPadding(marginPaddingContent)}
        >
          {ids.map((id, index) => {
            const normalizedId = id[0] === 'c' ? id.slice(1) : id;
            const content = entries.find(({ contentful_id }) => contentful_id === normalizedId);
            const { marginPaddingContent, ...slottedContent } = content;

            return (
              <ContentfulContent
                key={`${index}.${Math.random()}`}
                inSlot={true}
                {...slottedContent}
              />
            );
          })}
        </Box>
      );
    }


    return ids.map((id, index) => {
      const normalizedId = id[0] === 'c' ? id.slice(1) : id;
      const content = entries.find(({ contentful_id }) => contentful_id === normalizedId);

      return (
        <ContentfulContent
          inSlot={false}
          {...content}
          {...marginPadding.content}
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
    console.log('slotsWithEntries', slotsWithEntries);
    const contentNodes = Object.entries(contentWithEntries)
      .reduce((fields, [name, ids]) => ({ ...fields, [name]: getContent({ name, ids }) }), {});
    const slotsNodes = flatMap(slotsWithEntries, (ids, name) => getContent({ name, ids, inGrid: true }));
    const slotsNodes2 = Object.entries(slotsWithEntries).map(([name, ids]) => {
       return getContent({ name, ids, inGrid: true });
    });

    console.log('slotsNodes', slotsNodes);
    console.log('slotsNodes2', slotsNodes2);

    const slottedContent = (
      <SlottedContent
        {...marginPadding.slots}
        slotsNodes={slotsNodes}
        grids={grids}
      />
    );


    return (
      <Component
        data-comp={`Contentful Content: ${Component?.displayName || '???'}`}
        sx={_sx}
        fromCms={true}
        {...(inSlot ? {} : marginPadding.content)}
        // eslint-disable-next-line react/no-children-prop
        children={slottedContent}
        // {...marginPadding.content}
        {...contentNodes}
        {...props}
      >

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
