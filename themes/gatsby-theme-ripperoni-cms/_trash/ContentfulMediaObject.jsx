/** @jsx jsx */
import React from 'react';
import loadable from '@loadable/component';
import { jsx } from 'theme-ui';
import { Box } from 'theme-ui';

// NOTE: GO BACK AND MAKE ALL THE MEDIA RELATED COMPS BECOME LOADABLE COMPS 
// const MediaObject = loadable(() => import(/* webpackChunkName: "ThemeMediaObject" */ /* webpackPreload: true */ '@components/MediaObject'));
// const MediaObjectText = loadable(() => import(/* webpackChunkName: "ThemeMediaObjectText" */ /* webpackPreload: true */ '@components/MediaObjectText'));
// const MediaObjectMedia = loadable(() => import(/* webpackChunkName: "ThemeMediaObjectMedia" */ /* webpackPreload: true */ '@components/MediaObjectMedia'));
// const ContentfulContent = loadable(() => import(/* webpackChunkName: "ContentfulContent" */ /* webpackPreload: true */ '@components/ContentfulContent'));

import MediaObject from '../MediaObject/MediaObject'
import MediaObjectMedia from '../MediaObject/MediaObjectMedia'
import MediaObjectText from '../MediaObject/MediaObjectText'

const ContentfulMediaObject = ({type, id, backgroundColor, textContent, mediaContent, variant, ...props }) => {

  return (
    // this wrapper was originally a MediaObject from a theme, not a <Box>
    <MediaObject
      data-comp={ContentfulMediaObject.displayName}
      data-comp-variant={type}
      {...props}
      bg={backgroundColor}
      variant={variant}
      data-variant={variant}
      key={id}
    >
      <MediaObjectText>
        {textContent && textContent.map(item => (
          <ContentfulContent
            data-comp={type}
            data-comp-variant={variant} //props.variant
            {...item}
            key={item.id}
          />
        ))}
      </MediaObjectText>

      {/* Switching in a <Box> for now. Original code block above. */}
      {/* <Box>
        {textContent && textContent.map(item => (
          <ContentfulContent
            data-comp={type}
            data-comp-variant={variant} //props.variant
            {...item}
            key={item.id}
          />
        ))}
      </Box> */}

      {/* Switching in a <Box> for now. Original code block above. */}
      <MediaObjectMedia
        sx={MediaObjectMediaSx}
        css={{
          '.swiper-slide-active img': {
            opacity: '1 !important'
          }
        }}
        >
        {mediaContent && mediaContent.map(item => (
          <ContentfulContent
            data-comp={type}
            data-comp-variant={variant}
            {...item}
            key={item.id}
          />
        ))}
      </MediaObjectMedia>
      {/* Switching in a <Box> for now. Original code block above. */}
      {/* <Box
        sx={MediaObjectMediaSx}
        css={{
          '.swiper-slide-active img': {
            opacity: '1 !important'
          }
        }}
        >
        {mediaContent && mediaContent.map(item => (
          <ContentfulContent
            data-comp={type}
            data-comp-variant={variant}
            {...item}
            key={item.id}
          />
        ))}
      </Box> */}
    </MediaObject>
  );
};

const MediaObjectMediaSx = {
  '.swiper-button-next, .swiper-button-prev' : {
    '&:after': {
      color: 'text',
      fontSize: '24px'
    },
    '&:before': {
      content: '""',
      borderRadius: '50%',
      display: 'block',
      width: '45px',
      height: '45px',
      backgroundColor: 'orange',
      position: 'absolute',
      background: 'hsla(0,0%,100%,.75)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: -1,
    }
  },
  '.swiper-button-next' : {
    right: 9
  },
  '.swiper-button-prev' : {
    left: 9
  }
};

export default ContentfulMediaObject;
ContentfulMediaObject.displayName = 'ContentfulMediaObject';