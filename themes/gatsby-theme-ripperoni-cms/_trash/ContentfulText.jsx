/** @jsx jsx */

import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { jsx, Text } from 'theme-ui';
import { BLOCKS } from '@contentful/rich-text-types';

const ContentfulText = ({ type, id, text, variant, color, alignment, ...props }) => {
  const document = JSON.parse(text);
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    },
  };

  const richText = documentToReactComponents(document, options);

  return (
    <Text
      data-comp={ContentfulText.displayName}
      data-comp-variant={type}
      {...props}
      children={richText}
      variant={variant}
      key={props.id}
      sx={{
        color: color,
        textAlign: alignment,
        div: {
          m: 0,
          mb: 3,
          '&:first-of-type': { pt: 2 },
          '&:last-child': { mb: 0 },
        },
      }}
    />
  );
};

export default ContentfulText;
ContentfulText.displayName = 'ContentfulText';
