/**
 * @prettier
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Vimeo from '@u-wave/react-vimeo';

import { Box } from '../Box';
import { PlayButton } from './PlayButton';

export const VimeoVideo = ({ previewUrl, url, ...props }) => {
  const [preview, setPreview] = useState(true);
  const [paused, setPaused] = useState(true);

  return (
    <Box position='relative' {...props}>
      {previewUrl && !preview && (
        <Vimeo video={getVimeoId(url)} responsive={true} autoplay />
      )}

      {previewUrl && preview && (
        <Box position='relative'>
          <Vimeo
            video={getVimeoId(previewUrl)}
            controls={false}
            muted={true}
            background={true}
            autoplay
            loop
            responsive={true}
          />

          <Box
            onClick={() => setPreview(false)}
            position='absolute'
            top='50%'
            left='50%'
            sx={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <PlayButton />
          </Box>
        </Box>
      )}

      {!previewUrl && (
        <Box position='relative'>
          <Vimeo
            video={getVimeoId(url)}
            responsive={true}
            paused={paused}
            controls={true}
            onPause={() => setPaused(true)}
            onPlay={() => setPaused(false)}
          />

          {paused && (
            <Box
              onClick={() => setPaused(false)}
              position='absolute'
              top='50%'
              left='50%'
              sx={{
                transform: 'translate(-50%, -50%)',
              }}
            >
              <PlayButton />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

// https://stackoverflow.com/questions/2916544/parsing-a-vimeo-id-using-javascript
const getVimeoId = (url) => {
  // Look for a string with 'vimeo', then whatever, then a
  // forward slash and a group of digits.
  var match = /vimeo.*\/(\d+)/i.exec(url);

  // If the match isn't null (i.e. it matched)
  if (match) {
    // The grouped/matched digits from the regex
    return match[1];
  }
};

VimeoVideo.propTypes = {
  previewUrl: PropTypes.string,
  url: PropTypes.string.isRequired,
};
