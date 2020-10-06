/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as LinkUI, jsx } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';

import { useSxProps } from '../../hooks/useSxProps';

import { VimeoVideo } from './VimeoVideo';


export const Video = forwardRef(({
  previewUrl,  // comes from cms
  url,  // comes from cms
  type,  // comes from cms
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  const videoProps = {
    sx: {
      ...sxObject
    },
    ...props
  }

  Video.propTypes = {
    ...propTypes,
    url: PropTypes.string,
  };

  if (type === 'vimeo') {
    return (
      <VimeoVideo
        previewUrl={previewUrl}
        url={url}
        {...videoProps}
      />
    );
  }

  return null;
});

Video.Vimeo = VimeoVideo;
Video.displayName = 'Video';
