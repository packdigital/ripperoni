import React from 'react';

import { ErrorFallback } from './ErrorFallback';
import defaultNotes from './instructions.md';


const wrapperStyles = {
  background: 'white',
  height: '400px',
  margin: '32px',
  border: '1px solid black'
};

export default {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  decorators: [storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};


export const ErrorFallbackStory = () => <ErrorFallback />;

ErrorFallbackStory.story = {
  name: 'Default fallback svg'
};
