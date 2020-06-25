import React from 'react';
import { Image } from 'theme-ui';

import { CatchErrors, catchErrors } from './ErrorBoundry';
import defaultNotes from './instructions.md';


const wrapperStyles = {
  background: 'white',
  border: '1px solid black',
  height: '400px',
  margin: '32px',
};

export default {
  title: 'Components/ErrorBoundry',
  component: CatchErrors,
  decorators: [storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};

const RogueComponent = () => {
  throw new Error('fart');
};

const customErrorFallBack = () => {
  return <Image
    src='/images/pd-logo.png'
    height="100px"
         ></Image>;
};

export const ErrorBoundryStory = catchErrors(RogueComponent);
ErrorBoundryStory.story = {
  name: 'catchError HOC (default)'
};

export const ErrorBoundryHeightStory = catchErrors(RogueComponent, null, { height: '100px', width: '100%' });
ErrorBoundryHeightStory.story = {
  name: 'catchError HOC (custom height & width)'
};

export const ErrorBoundryCustomFallbackStory = catchErrors(RogueComponent, customErrorFallBack);
ErrorBoundryCustomFallbackStory.story = {
  name: 'catchError HOC (custom fallback)'
};

export const ErrorBoundryCustomFallbackAndHeightStory = catchErrors(RogueComponent, customErrorFallBack, { height: '200px' });
ErrorBoundryCustomFallbackAndHeightStory.story = {
  name: 'catchError HOC (custom fallback & height)'
};
