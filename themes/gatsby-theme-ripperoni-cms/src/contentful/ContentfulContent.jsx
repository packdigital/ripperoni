/* eslint-disable max-lines */
/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';

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

const getContent = (lookup, entries) => {
  if (!lookup || !entries) {
    return {};
  }

  const groups = groupBy(lookup, 'name');
  const groupedEntryIds = mapValues(groups, value => map(value, 'entry.sys.id'));

  return Object.entries(groupedEntryIds)
    .reduce((content, [name, value]) => ({
      ...content,
      // `id` (contentful id) is sometimes prefixed with c if it originally started with a number
      [name]: value.map(id => entries.find(({ contentful_id }) => id.endsWith(contentful_id)))
    }), {});
};

const parseProps = props => {
  const lookups = groupBy(props.lookup, 'type');

  const Component = props.__typename === 'ContentfulMolecule'
    ? components[props.component]
    : components[props.__typename];

  const cmsStylePropsList = [
    'color',
    'backgroundColor',
    'fontSize',
    'fontWeight',
    'textAlign',
    'maxWidth',
  ];

  const cmsStyleProps = Object.entries(props)
    .filter(([name]) => cmsStylePropsList.includes(name))
    .filter(([, value]) => Array.isArray(value))
    .reduce((props, [name, value]) => ({
      ...props,
      [name]: value.map(value => value?.__typename
        ? parseInt(value[name]) || value[name]
        : value)
    }), {});

  const otherProps = Object.entries(props)
    .filter(([name]) => !cmsStylePropsList.includes(name))
    .filter(([, value]) => value)
    .filter(([, value]) => Array.isArray(value) ? value.some(value => value !== null) : value)
    .reduce((otherProps, [name, value]) => ({ ...otherProps, [name]: value }), {});

  return {
    ...otherProps,
    ...cmsStyleProps,
    Component,
    marginPadding: getMarginPadding(props.marginPadding),
    marginPaddingContent: getMarginPadding(props.marginPaddingContent),
    marginPaddingSlots: getMarginPadding(props.marginPaddingSlots),
    content: getContent(lookups.content, props.entries),
    slots: getContent(lookups.slots, props.entries),
  };
};

export const ContentfulContent = incomingProps => {
  const parsedProps = parseProps(incomingProps);
  // console.log('parsedProps', parsedProps);
  const {
    Component,
    marginPadding,
    marginPaddingContent,
    marginPaddingSlots,
    pageContent,
    content,
    slots,
    grids,
    _sx,
    __typename,
    ...props
  } = parsedProps;

  if (!__typename) {
    return null;
  }

  if (__typename.startsWith('ContentfulAtom')) {
    return (
      <Component
        {...props}
        sx={_sx}
        {...marginPadding}
      />
    );
  }

  if (__typename === 'ContentfulPageContainer') {
    return (
      <Component>
        {pageContent.map((section, index) => (
          <ContentfulContent
            {...section}
            key={index}
          />
        ))}
      </Component>
    );
  }

  if (__typename === 'ContentfulMolecule') {
    const mapOverContent = (content, index) => {
      return (
        <ContentfulContent
          {...props}
          {...content}
          key={`${index}.${Math.random()}`}
        />
      );
    };
    const contentNodes = Object.entries(content)
      .reduce((fields, [name, contents]) => ({
        ...fields,
        [name]: contents.map(mapOverContent)
      }), {});

    const slotsNodes = Object.entries(slots)
      .map(([name, contents], index) => (
        // eslint-disable-next-line
        <Box gridArea={name} key={index}>
          {contents.map(mapOverContent)}
        </Box>
      ));


    const slottedContent = (
      <SlottedContent
        {...props}
        {...marginPaddingSlots}
        slotsNodes={slotsNodes}
        grids={grids}
      />
    );
        console.log('Component', Component);

    return (
      <Component
        data-comp={`Contentful Content: ${Component?.displayName || '???'}`}
        sx={_sx}
        fromCms={true}
        // {...(inSlot ? {} : marginPaddingContent)}
        {...marginPaddingContent}
        // eslint-disable-next-line react/no-children-prop
        children={slottedContent}
        {...contentNodes}
        {...props}
      />
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
