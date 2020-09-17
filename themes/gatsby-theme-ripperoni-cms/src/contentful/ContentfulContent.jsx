/**
 * @jsx jsx
 * @prettier
 */

/* eslint-disable max-lines */

import { jsx, useThemeUI } from 'theme-ui';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';

import { Box } from '@ripperoni/components';
import { components } from '@ripperoni/cms/contentful/components';

import { SlottedContent } from './SlottedContent';

const getMarginPadding = (breakpoints) => (marginPadding) => {
  return marginPadding?.reduce(
    (spacings, { type, direction, value, viewport }) => {
      const key = `${type}${direction}`;

      return {
        ...spacings,
        [key]: (
          spacings[key] || Array(breakpoints.length + 1).fill(null)
        ).map((item, index) =>
          parseInt(viewport) === index ? parseInt(value) || value : item
        ),
      };
    },
    {}
  );
};

export const getContent = (lookup, entries) => {
  if (!lookup || !entries) {
    return {};
  }

  const groups = groupBy(lookup, 'name');
  const groupedEntryIds = mapValues(groups, (value) =>
    map(value, 'entry.sys.id')
  );

  return Object.entries(groupedEntryIds).reduce(
    (content, [name, value]) => ({
      ...content,
      // `id` (contentful id) is sometimes prefixed
      // with c if it originally started with a number
      [name]: value.map((id) =>
        entries.find(({ contentful_id }) => id.endsWith(contentful_id))
      ),
    }),
    {}
  );
};

const parseProps = ({
  component,
  lookup,
  entries,
  marginPadding,
  marginPaddingContent,
  marginPaddingSlots,
  __typename,
  getMarginPaddingWithBreakpoints,
  extraProps,
  ...props
}) => {
  const lookups = groupBy(lookup, 'type');

  const Component =
    __typename === 'ContentfulMolecule'
      ? components[component]
      : components[__typename];

  const cmsStyleProps = Object.entries(props)
    .filter(([, value]) =>
      Array.isArray(value) ? value.some((value) => value) : value
    )
    .filter(([name]) => name.startsWith('cms_'))
    .filter(([, value]) => Array.isArray(value))
    .map(([name, value]) => [name.replace('cms_', ''), value])
    .reduce(
      (props, [name, value]) => ({
        ...props,
        [name]: value.map((value) =>
          !value?.__typename
            ? value
            : isNaN(parseInt(value[name]))
            ? value[name]
            : parseInt(value[name])
        ),
      }),
      {}
    );

  const otherProps = Object.entries(props)
    .filter(([, value]) =>
      Array.isArray(value) ? value.some((value) => value) : value
    )
    .filter(([name]) => !name.startsWith('cms_'))
    .filter(([, value]) => value)
    .reduce(
      (otherProps, [name, value]) => ({ ...otherProps, [name]: value }),
      {}
    );

  const extraPropsObject = extraProps?.reduce(
    (props, { name, value }) => ({ ...props, [name]: value }),
    {}
  );

  return {
    ...cmsStyleProps,
    ...otherProps,
    Component,
    marginPadding: getMarginPaddingWithBreakpoints(marginPadding),
    marginPaddingContent: getMarginPaddingWithBreakpoints(marginPaddingContent),
    marginPaddingSlots: getMarginPaddingWithBreakpoints(marginPaddingSlots),
    content: getContent(lookups.content, entries),
    slots: getContent(lookups.slots, entries),
    __typename,
    ...extraPropsObject,
  };
};

export const ContentfulContent = (incomingProps) => {
  const {
    theme: { breakpoints },
  } = useThemeUI();
  const getMarginPaddingWithBreakpoints = getMarginPadding(breakpoints);

  const parsedProps = parseProps({
    ...incomingProps,
    getMarginPaddingWithBreakpoints,
  });
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
    return <Component {...props} {...marginPadding} sx={_sx} />;
  }

  if (__typename === 'ContentfulPageContainer') {
    return (
      <Component>
        {pageContent.map((section, index) => (
          <ContentfulContent {...section} key={index} />
        ))}
      </Component>
    );
  }

  if (__typename === 'ContentfulMolecule') {
    // eslint-disable-next-line
    const mapOverContent = ({ marginPaddingContent, ...content }, index) => {
      return (
        <ContentfulContent
          {...content}
          {...getMarginPaddingWithBreakpoints(marginPaddingContent)}
          key={`${index}.${Math.random()}`}
        />
      );
    };

    const contentNodes = Object.entries(content).reduce(
      (fields, [name, contents]) => ({
        ...fields,
        [name]: contents.filter(Boolean).map(mapOverContent),
      }),
      {}
    );

    const slotsNodes = Object.entries(slots).map(([name, contents], index) => (
      // eslint-disable-next-line
        <Box gridArea={name} key={index}>
        {contents.filter(Boolean).map(mapOverContent)}
      </Box>
    ));
    // .map(([name, contents], index) => contents.map(mapOverContent(name)));

    const slottedContent = (
      <SlottedContent
        {...marginPaddingSlots}
        slotsNodes={slotsNodes}
        grids={grids}
      />
    );

    return (
      <Component
        data-comp={`Contentful Content: ${Component?.displayName || '???'}`}
        sx={_sx}
        fromCms={true}
        // eslint-disable-next-line
        children={slottedContent}
        {...contentNodes}
        {...props}
        {...marginPaddingContent}
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
