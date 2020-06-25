import React from 'react';
import FlexMQ from './FlexMQ';
import defaultNotes from './instructions.md';
import { withKnobs, array, object } from "@storybook/addon-knobs";
import { Box, Heading } from 'theme-ui';
import theme from '../../gatsby-plugin-theme-ui'

const wrapperStyles = {
  background: '#f2f2f2',
  height: '500px',
  margin: '32px',
}

export default {
  title: 'Components/FlexMQ',
  component: FlexMQ,
  decorators: [withKnobs, storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};

export const FlexMQStory = () => {
  // knobs
  const propsGroupId = 'FlexMQ props';
  const direction = array('direction', ['col', 'col', 'row'], ',', propsGroupId);
  const stretch = array('stretch', [], ',', propsGroupId);
  const stretchX = array("stretchX", [], ',', propsGroupId);
  const stretchY = array("stretchY", [], ',', propsGroupId);
  const wrapped = array('wrapped', [], ',', propsGroupId);
  const around = array('around', [], ',', propsGroupId);
  const between = array('between', [], ',', propsGroupId);
  const evenly = array('evenly', [true,false,true], ',', propsGroupId);
  const left = array('left', [], ',', propsGroupId);
  const center = array('center', [], ',', propsGroupId);
  const right = array('right', [], ',', propsGroupId);
  const top = array('top', [], ',', propsGroupId);
  const middle = array('middle', [false,true,false], ',', propsGroupId);
  const bottom = array('bottom', [], ',', propsGroupId);
  const reverse = array('reverse', [false,true], ',', propsGroupId);

  // sx overwrite object
  const Sx = 'Sx Object';
  const groupId = 'sx overwrites';
  const defaultValue = {};
  const SX = object(Sx, defaultValue, groupId);

  const boxSx = {
    width: '100%',
    height: '45px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }

  return (
    <>
      <h4>Change Viewport 👆</h4>
      <FlexMQ
        direction={direction}
        stretch={stretch}
        stretchX={stretchX}
        stretchY={stretchY}
        wrapped={wrapped}
        around={around}
        between={between}
        evenly={evenly}
        left={left}
        center={center}
        right={right}
        top={top}
        middle={middle}
        bottom={bottom}
        reverse={reverse}
        sx={SX}
        >
        <Box sx={boxSx} bg={theme.colors.background} style={{ color: theme.colors.text }}>1</Box>
        <Box sx={boxSx} bg={theme.colors.primary}>2</Box>
        <Box sx={boxSx} bg={theme.colors.text}>3</Box>
      </FlexMQ>
    </>
  )
}
FlexMQStory.story = {
  name: 'FlexMQ (SSR)'
}

export const FlexMQCsrStory = () => {
  // knobs
  const propsGroupId = 'FlexMQ props';
  const direction = array('direction', ['col', 'col', 'row'], ',', propsGroupId);
  const stretch = array('stretch', [], ',', propsGroupId);
  const stretchX = array("stretchX", [], ',', propsGroupId);
  const stretchY = array("stretchY", [], ',', propsGroupId);
  const wrapped = array('wrapped', [], ',', propsGroupId);
  const around = array('around', [], ',', propsGroupId);
  const between = array('between', [], ',', propsGroupId);
  const evenly = array('evenly', [true,false,true], ',', propsGroupId);
  const left = array('left', [], ',', propsGroupId);
  const center = array('center', [], ',', propsGroupId);
  const right = array('right', [], ',', propsGroupId);
  const top = array('top', [], ',', propsGroupId);
  const middle = array('middle', [false,true,false], ',', propsGroupId);
  const bottom = array('bottom', [], ',', propsGroupId);
  const reverse = array('reverse', [false,true], ',', propsGroupId);

  // sx overwrite object
  const Sx = 'Sx Object';
  const groupId = 'sx overwrites';
  const defaultValue = {};
  const SX = object(Sx, defaultValue, groupId);

  const boxSx = {
    width: '100%',
    height: '45px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }

  return (
    <>
      <h4>Change Viewport 👆</h4>
      <FlexMQ.Csr
        direction={direction}
        stretch={stretch}
        stretchX={stretchX}
        stretchY={stretchY}
        wrapped={wrapped}
        around={around}
        between={between}
        evenly={evenly}
        left={left}
        center={center}
        right={right}
        top={top}
        middle={middle}
        bottom={bottom}
        reverse={reverse}
        sx={SX}
        >
        <Box sx={boxSx} bg={theme.colors.background} style={{ color: theme.colors.text }}>1</Box>
        <Box sx={boxSx} bg={theme.colors.primary}>2</Box>
        <Box sx={boxSx} bg={theme.colors.text}>3</Box>
      </FlexMQ.Csr>
    </>
  )
}
FlexMQCsrStory.story = {
  name: 'FlexMQ.Csr (CSR)'
}


