import React from 'react';
import { array, object, withKnobs } from '@storybook/addon-knobs';
import { Box } from 'theme-ui';

import theme from '../../gatsby-plugin-theme-ui';

import defaultNotes from './instructions.md';
import { MQ } from './MQ';


const wrapperStyles = {
  background: '#f2f2f2',
  height: '400px',
  margin: '32px',
};

export default {
  title: 'Components/MQ',
  component: MQ,
  decorators: [withKnobs, storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};

const renderComps = names => {

  const boxSx = {
    width: '125px',
    height: '125px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  };

  let compEls = {
    xs: <Box
      sx={boxSx}
      bg={theme.colors.background}
      style={{ color: theme.colors.text }}
        >x-small</Box>,
    s: <Box
      sx={boxSx}
      bg={theme.colors.primary}
       >small</Box>,
    sm: <Box
      sx={boxSx}
      bg={theme.colors.text}
        >small-medium</Box>,
    m: <Box
      sx={boxSx}
      bg={theme.colors.secondary}
       >medium</Box>,
    ml: <Box
      sx={boxSx}
      bg={theme.colors.secondary}
        >medium-large</Box>,
    l: <Box
      sx={boxSx}
      bg={theme.colors.muted}
      style={{ color: theme.colors.text }}
       >large</Box>,
    xl: <Box
      sx={boxSx}
      bg={theme.colors.accent}
        >x-large</Box>
  };

  return names.map(c => compEls[c]);
};

export const MQStory = () => {
  // knobs
  const outerGroupId = 'MQ props';
  const comps = array('components', ['xs', 's', 'sm', 'm', 'ml', 'l', 'xl'], ',', outerGroupId);

  // sx overwrite object
  const Sx = 'Sx Object';
  const groupId = 'sx overwrites';
  const defaultValue = {};
  const SX = object(Sx, defaultValue, groupId);

  return (
    <>
      <h4>Change Viewport 👆</h4>
      <MQ
        sx={SX}
        comps={renderComps(comps)}
      />
    </>
  );
};

MQStory.story = {
  name: 'MQ (SSR)'
};

export const MQCsrStory = () => {
  // knobs
  const outerGroupId = 'MQ props';
  const comps = array('components', ['xs', 's', 'sm', 'm', 'ml', 'l', 'xl'], ',', outerGroupId);

  // sx overwrite object
  const Sx = 'Sx Object';
  const groupId = 'sx overwrites';
  const defaultValue = {};
  const SX = object(Sx, defaultValue, groupId);

  return (
    <>
      <h4>Change Viewport 👆</h4>
      <MQ.Csr
        sx={SX}
        comps={renderComps(comps)}
      />
    </>
  );
};

MQCsrStory.story = {
  name: 'MQ.Csr (CSR)'
};
