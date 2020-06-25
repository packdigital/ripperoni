import React from 'react';
import { boolean, object, withKnobs } from '@storybook/addon-knobs';

import Container from './Container';
import defaultNotes from './instructions.md';


const wrapperStyles = {
  background: '#f2f2f2',
  minHeight: '400px',
};

export default {
  title: 'Components/Container',
  component: Container,
  // TODO: refactor the wrapper
  decorators: [withKnobs, storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};

// TODO: refactor to more functional
export const ContainerSingle = () => {
  const outerGroupId = 'Container props';
  const contain = boolean('contain', false, outerGroupId);
  const center = boolean('center', false, outerGroupId);
  const right = boolean('right', false, outerGroupId);
  const primary = boolean('primary', true, outerGroupId);
  const secondary = boolean('secondary', false, outerGroupId);
  const pl = boolean('pl', false, outerGroupId);
  const pr = boolean('pr', false, outerGroupId);
  const px = boolean('px', false, outerGroupId);
  const pt = boolean('pt', false, outerGroupId);
  const pb = boolean('pb', false, outerGroupId);
  const py = boolean('py', false, outerGroupId);

  const Sx = 'Sx Object';
  const defaultValue = {};
  const groupId = 'sx overwrites';
  const SX = object(Sx, defaultValue, groupId);

  return (
    <Container
      contain={contain}
      center={center}
      primary={primary}
      secondary={secondary}
      pl={pl}
      pr={pr}
      px={px}
      pt={pt}
      pb={pb}
      py={py}
      right={right}
      sx={SX}
    >
        { contain ? 'contain ' : ''}
        { center ? 'center ' : ''}
        { primary ? 'primary ' : ''}
        { secondary ? 'secondary ' : ''}
        { pl ? 'pl ' : ''}
        { pr ? 'pr ' : ''}
        { px ? 'px ' : ''}
        { pt ? 'pt ' : ''}
        { pb ? 'pb ' : ''}
        { py ? 'py ' : ''}
        { right ? 'right ' : ''}
    </Container>
  );
};
ContainerSingle.story = {
  name: 'Container (single)'
};

export const ContainerSmallSingle = () => {
  const outerGroupId = 'Container.Small props';
  const contain = boolean('contain', false, outerGroupId);
  const center = boolean('center', false, outerGroupId);
  const right = boolean('right', false, outerGroupId);
  const primary = boolean('primary', true, outerGroupId);
  const secondary = boolean('secondary', false, outerGroupId);
  const pl = boolean('pl', false, outerGroupId);
  const pr = boolean('pr', false, outerGroupId);
  const px = boolean('px', false, outerGroupId);
  const pt = boolean('pt', false, outerGroupId);
  const pb = boolean('pb', false, outerGroupId);
  const py = boolean('py', false, outerGroupId);

  const Sx = 'Sx Object';
  const defaultValue = {};
  const groupId = 'sx overwrites';
  const SX = object(Sx, defaultValue, groupId);

  return (
    <Container.Small
      contain={contain}
      center={center}
      primary={primary}
      secondary={secondary}
      pl={pl}
      pr={pr}
      px={px}
      pt={pt}
      pb={pb}
      py={py}
      right={right}
      sx={SX}
    >
        { contain ? 'contain ' : ''}
        { center ? 'center ' : ''}
        { primary ? 'primary ' : ''}
        { secondary ? 'secondary ' : ''}
        { pl ? 'pl ' : ''}
        { pr ? 'pr ' : ''}
        { px ? 'px ' : ''}
        { pt ? 'pt ' : ''}
        { pb ? 'pb ' : ''}
        { py ? 'py ' : ''}
        { right ? 'right ' : ''}
    </Container.Small>
  );
};
ContainerSmallSingle.story = {
  name: 'Container.Small (single)'
};

export const ContainerLargeSingle = () => {
  const outerGroupId = 'Container.Large props';
  const contain = boolean('contain', false, outerGroupId);
  const center = boolean('center', false, outerGroupId);
  const right = boolean('right', false, outerGroupId);
  const primary = boolean('primary', true, outerGroupId);
  const secondary = boolean('secondary', false, outerGroupId);
  const pl = boolean('pl', false, outerGroupId);
  const pr = boolean('pr', false, outerGroupId);
  const px = boolean('px', false, outerGroupId);
  const pt = boolean('pt', false, outerGroupId);
  const pb = boolean('pb', false, outerGroupId);
  const py = boolean('py', false, outerGroupId);

  const Sx = 'Sx Object';
  const defaultValue = {};
  const groupId = 'sx overwrites';
  const SX = object(Sx, defaultValue, groupId);

  return (
    <Container.Large
      contain={contain}
      center={center}
      primary={primary}
      secondary={secondary}
      pl={pl}
      pr={pr}
      px={px}
      pt={pt}
      pb={pb}
      py={py}
      right={right}
      sx={SX}
    >
        { contain ? 'contain ' : ''}
        { center ? 'center ' : ''}
        { primary ? 'primary ' : ''}
        { secondary ? 'secondary ' : ''}
        { pl ? 'pl ' : ''}
        { pr ? 'pr ' : ''}
        { px ? 'px ' : ''}
        { pt ? 'pt ' : ''}
        { pb ? 'pb ' : ''}
        { py ? 'py ' : ''}
        { right ? 'right ' : ''}
    </Container.Large>
  );
};
ContainerLargeSingle.story = {
  name: 'Container.Large (single)'
};


export const ContainerNested = () => {
  const outerGroupId = 'Container props (outer container)';
  const contain = boolean('contain', false, outerGroupId);
  const center = boolean('center', false, outerGroupId);
  const right = boolean('right', false, outerGroupId);
  const primary = boolean('primary', true, outerGroupId);
  const secondary = boolean('secondary', false, outerGroupId);
  const pl = boolean('pl', false, outerGroupId);
  const pr = boolean('pr', false, outerGroupId);
  const px = boolean('px', false, outerGroupId);
  const pt = boolean('pt', false, outerGroupId);
  const pb = boolean('pb', false, outerGroupId);
  const py = boolean('py', false, outerGroupId);

  const innerGroupId = 'Container props (inner container)';
  const containI = boolean('contain (inner)', false, innerGroupId);
  const centerI = boolean('center (inner)', false, innerGroupId);
  const rightI = boolean('right', false, outerGroupId);
  const primaryI = boolean('primary (inner)', false, innerGroupId);
  const secondaryI = boolean('secondary (inner)', false, innerGroupId);
  const plI = boolean('pl (inner)', false, innerGroupId);
  const prI = boolean('pr (inner)', false, innerGroupId);
  const pxI = boolean('px (inner)', false, innerGroupId);
  const ptI = boolean('pt (inner)', false, innerGroupId);
  const pbI = boolean('pb (inner)', false, innerGroupId);
  const pyI = boolean('py (inner)', false, innerGroupId);

  const Sx = 'Sx Object';
  const defaultValue = {};
  const groupId = 'sx overwrites (inner)';
  const SXI = object(Sx, defaultValue, groupId);

  return (
    <Container
      contain={contain}
      center={center}
      primary={primary}
      secondary={secondary}
      pl={pl}
      pr={pr}
      px={px}
      pt={pt}
      pb={pb}
      py={py}
      right={right}
    >
        { contain ? 'contain ' : ''}
        { center ? 'center ' : ''}
        { primary ? 'primary ' : ''}
        { secondary ? 'secondary ' : ''}
        { pl ? 'pl ' : ''}
        { pr ? 'pr ' : ''}
        { px ? 'px ' : ''}
        { pt ? 'pt ' : ''}
        { pb ? 'pb ' : ''}
        { py ? 'py ' : ''}
        { right ? 'right ' : ''}
        <Container
          sx={SXI}
          contain={containI}
          center={centerI}
          primary={primaryI}
          secondary={secondaryI}
          pl={plI}
          pr={prI}
          px={pxI}
          pt={ptI}
          pb={pbI}
          py={pyI}
          right={rightI}
        >
            { containI ? 'contain ' : ''}
            { centerI ? 'center ' : ''}
            { primaryI ? 'primary ' : ''}
            { secondaryI ? 'secondary ' : ''}
            { plI ? 'pl ' : ''}
            { prI ? 'pr ' : ''}
            { pxI ? 'px ' : ''}
            { ptI ? 'pt ' : ''}
            { pbI ? 'pb ' : ''}
            { pyI ? 'py ' : ''}
            { right ? 'right ' : ''}
            { Object.keys(SXI).length ? 'Sx overwrites ' : ''}
        </Container>
    </Container>
  );
};
ContainerNested.story = {
  name: 'Container(s) (nested props)'
};

// nested use cases
export const ContainersSxOverwrite = () => (
  <Container
    primary
    px
    py
  >
    container primary px py
    <Container
      px
      sx={{ height: '50px', bg: 'white' }}
    >
      container px sx:bg:white sx:height:'50px'
    </Container>
  </Container>
);
ContainersSxOverwrite.story = {
  name: 'Container(s) (nested sx)'
};
