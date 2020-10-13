/**
 * @prettier
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import { BLOCKS } from '@contentful/rich-text-types';

import { Text } from '../Text';

export const Markdown = ({ longText = {}, ...incomingProps }) => {
  const [textContent, setTextContent] = useState(null);

  useEffect(() => {
    const options = {
      renderNode: {
        // eslint-disable-next-line react/display-name
        [BLOCKS.PARAGRAPH]: (node, children) => (
          <Text {...incomingProps}>{children}</Text>
        ),
      },
    };

    richTextFromMarkdown(longText.text).then((data) =>
      setTextContent(documentToReactComponents(data, options))
    );
  }, [longText.text]);

  // swiper won't render markdown in cloned slides without re-render
  // so instead of rendering nothing while we wait for contentful to
  // to convert markdown to richtext, just render as text
  return textContent || <Text {...incomingProps}>{longText.text}</Text>;
};

Markdown.displayName = 'Markdown';

Markdown.propTypes = {
  longText: PropTypes.shape({
    text: PropTypes.string,
  }),
};
