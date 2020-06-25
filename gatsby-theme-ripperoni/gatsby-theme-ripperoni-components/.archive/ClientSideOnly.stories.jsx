import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { ClientSideOnly } from './ClientSideOnly';
import defaultNotes from './instructions.md';


const wrapperStyles = {
  background: '#f2f2f2',
  height: '500px',
  margin: '32px',
  padding: '24px'
};


export default {
  title: 'Components/ClientSideOnly',
  component: ClientSideOnly,
  decorators: [withKnobs, storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};

export const ClientSideOnlyStory = () => {
  return (
    <ClientSideOnly>
      <h4>I was rendered @ client-side 👀</h4>
      <small>Components wrapped inside ClientSideOnly output no markup on SSR/html files</small>
    </ClientSideOnly>
  );
};

ClientSideOnlyStory.story = {
  name: 'ClientSideOnly'
};
