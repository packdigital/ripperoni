import React from 'react';
import loadable from '@loadable/component'
import { Box, Container } from 'theme-ui';
import Row from '@components/Row';
const ContentfulContent = loadable(() => import(/* webpackChunkName: "ContentfulContent" */ /* webpackPreload: true */ '@components/ContentfulContent'));

const ContentfulSection = ({
  type,
  id,
  backgroundColor,
  sectionContent,
  variant: variant,
  ...props
}) => {
  const outerVariant = backgroundColor && 'contentful.section.withBg';
  const innerVariant = backgroundColor && variant.includes('containedWithGutter')
    ? 'contentful.section.wrappedAndContainedWithGutter'
    : variant;

  return (
    <Box
      as="section"
      data-comp={ContentfulSection.displayName}
      data-comp-variant={variant}
      bg={backgroundColor}
      css={{ width: '100%' }}
      // variant={outerVariant}
      key={id}
    >
      <Container
        {...props}
        variant={innerVariant}
      >
        <Row>
          {sectionContent && sectionContent.map((item, index, array) => {
            return (
              <ContentfulContent
                {...item}
                index={index}
                count={array.length}
                key={(item && item.id) || index}
              />
            )
          })}
        </Row>
      </Container>
    </Box>
  );
};

export default ContentfulSection;
ContentfulSection.displayName = 'ContentfulSection';