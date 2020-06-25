import React from 'react';
import FlexCol from './FlexCol';
import defaultNotes from './instructions.md';
import { withKnobs, boolean, object } from "@storybook/addon-knobs";
import { Box } from 'theme-ui';
import theme from '../../gatsby-plugin-theme-ui/'

const wrapperStyles = {
  background: '#f2f2f2',
  height: '400px',
  margin: '32px',
}

export default {
  title: 'Components/FlexCol',
  component: FlexCol,
  decorators: [withKnobs, storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};


export const FlexColStory = () => {
  // knobs
  const outerGroupId = 'FlexCol props';

  const stretch = boolean("stretch", false, outerGroupId);
  const stretchX = boolean("stretchX", false, outerGroupId);
  const stretchY = boolean("stretchY", false, outerGroupId);
  const wrapped = boolean("wrapped", false, outerGroupId);

  const around = boolean("around", false, outerGroupId);
  const between = boolean("between", false, outerGroupId);
  const evenly = boolean("evenly", false, outerGroupId);

  const left = boolean("left", false, outerGroupId);
  const center = boolean("center", false, outerGroupId);
  const right = boolean("right", false, outerGroupId);

  const top = boolean("top", false, outerGroupId);
  const middle = boolean("middle", false, outerGroupId);
  const bottom = boolean("bottom", false, outerGroupId);

  const reverse = boolean("reverse", false, outerGroupId);

  // sx overwrite object
  const Sx = 'Sx Object';
  const groupId = 'sx overwrites';
  const defaultValue = {
    height: 'inherit'
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
    <FlexCol
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
    </FlexCol>
  )
}
FlexColStory.story = {
  name: 'FlexCol (single)'
}