import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Flex } from '@ripperoni/components';


export const ContentfulContent = props => {
  const result = useStaticQuery(StaticQuery);
  console.log('result', result);

  return (
    <Flex>hi</Flex>
  );
};

const StaticQuery = graphql`
  {
    allContentfulContentType {
      nodes {
        id
        name
        displayField
        description
      }
    }
  }
`;
