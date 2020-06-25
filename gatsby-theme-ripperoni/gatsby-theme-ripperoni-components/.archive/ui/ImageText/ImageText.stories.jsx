import React from 'react';
import defaultNotes from './instructions.md';
import { withKnobs, text, array, object } from "@storybook/addon-knobs";
import { Heading, Text, Image, Box } from 'theme-ui';
import {FlexMQ, FlexCol } from '@components';
import theme from '../../gatsby-plugin-theme-ui'

const wrapperStyles = {
  height: '300px',
  margin: '32px',
  border: '1px solid black'
}

export default {
  title: 'UI/ImageText',
  component: FlexMQ,
  decorators: [withKnobs, storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};


export const ImageTextStory = () => {
  // knobs
  const propsGroupId = 'Image Text props';
  const direction = array('direction', ['col', 'col', 'row'], ',', propsGroupId);
  const stretch = array('stretch', [], ',', propsGroupId);
  const stretchX = array("stretchX", [], ',', propsGroupId);
  const stretchY = array("stretchY", [], ',', propsGroupId);
  const wrapped = array('wrapped', [], ',', propsGroupId);
  const around = array('around', [], ',', propsGroupId);
  const between = array('between', [], ',', propsGroupId);
  const evenly = array('evenly', [], ',', propsGroupId);
  const left = array('left', [], ',', propsGroupId);
  const center = array('center', [false, true, false], ',', propsGroupId);
  const right = array('right', [], ',', propsGroupId);
  const top = array('top', [true], ',', propsGroupId);
  const middle = array('middle', [], ',', propsGroupId);
  const bottom = array('bottom', [], ',', propsGroupId);
  const reverse = array('reverse', [false, true, false], ',', propsGroupId);
  
  // UI 


  // sx overwrite object
  const Sx = 'Sx Object';
  const groupId = 'sx overwrites';
  const defaultValue = {
    height: 'auto',
    p: ['12px']
  }
  const SX = object(Sx, defaultValue, groupId);

  const boxSx = {
    width: '75px',
    height: '75px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }

  return (
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
        <Image sx={{pb: [2], pr: [2]}} src='/images/pd-logo.png' width="125px" height="125px"></Image>

        <FlexMQ
          direction={['col', 'col', 'row']}
          wrapped={[true]}
          top={[true]}
          center={[true, true, false]}
          stretchX={[true]}
        >
          <Heading sx={{color: theme.colors.primary, textAlign: ['left', 'center', 'left']}}>
            {text("Title", `Magna Ipsum Condimentum.`, propsGroupId)}
          </Heading>
          <Text as="p" sx={{color: theme.colors.text, textAlign: ['left', 'center', 'left']}}>
            {text("Text", `Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor.`, propsGroupId)}
          </Text>
        </FlexMQ>
    </FlexMQ>
  )
}
ImageTextStory.story = {
  name: 'Image Text (single)'
}
