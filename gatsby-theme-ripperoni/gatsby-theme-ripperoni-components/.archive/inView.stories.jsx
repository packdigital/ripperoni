import React, { useRef } from 'react';
import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { Box } from 'theme-ui';

import theme from '../../gatsby-plugin-theme-ui';
import { windowRequestTimeouAndInterval } from '../../utility/shims';

import { InView } from './InView';
import defaultNotes from './instructions.md';


windowRequestTimeouAndInterval();

const wrapperStyles = {
  background: '#f2f2f2',
  height: '400px',
  margin: '32px',
  // overflowY: 'scroll'
};

export default {
  title: 'Components/InView',
  component: InView,
  decorators: [withKnobs, storyFn => <div style={wrapperStyles}>{storyFn()}</div>],
  parameters: { notes: defaultNotes },
};


export const InViewStory = () => {
  // knobs
  const outerGroupId = 'InView props';
  const initialHeight = text('initialHeight', '175px', outerGroupId);

  const resetHeightToOptions = {
    initial: 'initial',
    mounted: 'mounted',
  };

  const loadedThreshold = number('initialHeight', 300, outerGroupId);
  const resetHeightTo = select('resetHeightTo', resetHeightToOptions, 'initial', outerGroupId);


  const scrollContainerRef = React.useRef();

  const boxSx = {
    width: '125px',
    height: '125px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: '50px',
    opacity: 0,
    transition: 'all .3s linear',
    MozTransition: 'all .3s linear',
    WebkitTransition: 'all .3s linear',
    transform: 'translateX(-150px)',

    // child rendered
    '&.rendered': {
      transform: 'translateX(0px)',
      opacity: 1,
    }
  };


  return (
    <>
      <h4>Scroll Container 👇</h4>
      <ScrollContainer ref={scrollContainerRef}>
        <InView
          seqIndex={1}
          initialHeight={initialHeight}
          resetHeightTo={resetHeightTo}
          loadedThreshold={loadedThreshold}
          root={scrollContainerRef.current}
        >
          <Box
            sx={boxSx}
            bg={theme.colors.background}
            style={{ color: theme.colors.text }}
          >
            one
          </Box>
        </InView>

        <InView
          seqIndex={2}
          resetHeightTo={resetHeightTo}
          initialHeight={initialHeight}
          loadedThreshold={loadedThreshold}
          root={scrollContainerRef.current}
        >
          <Box
            sx={boxSx}
            bg={theme.colors.primary}
          >
            two
          </Box>
        </InView>

        <InView
          seqIndex={3}
          resetHeightTo={resetHeightTo}
          initialHeight={initialHeight}
          loadedThreshold={loadedThreshold}
          root={scrollContainerRef.current}
        >
          <Box
            sx={boxSx}
            bg={theme.colors.text}
          >
            three
          </Box>
        </InView>

        <InView
          seqIndex={4}
          resetHeightTo={resetHeightTo}
          initialHeight={initialHeight}
          loadedThreshold={loadedThreshold}
          root={scrollContainerRef.current}
        >
          <Box
            sx={boxSx}
            bg={theme.colors.secondary}
          >
            four
          </Box>
        </InView>

        <InView
          seqIndex={5}
          resetHeightTo={resetHeightTo}
          initialHeight={initialHeight}
          loadedThreshold={loadedThreshold}
          root={scrollContainerRef.current}
        >
          <Box
            sx={boxSx}
            bg='lightgrey'
          >
            five
          </Box>
        </InView>
        <InView
          seqIndex={6}
          resetHeightTo={resetHeightTo}
          initialHeight={initialHeight}
          loadedThreshold={loadedThreshold}
          root={scrollContainerRef.current}
        >
          <Box
            sx={boxSx}
            bg={theme.colors.muted}
            style={{ color: theme.colors.text }}
          >
            six
          </Box>
        </InView>
        <InView
          seqIndex={7}
          resetHeightTo={resetHeightTo}
          initialHeight={initialHeight}
          loadedThreshold={loadedThreshold}
          root={scrollContainerRef.current}
        >
          <Box
            sx={boxSx}
            bg={theme.colors.accent}
          >
            seven
          </Box>
        </InView>
      </ScrollContainer>
    </>
  );
};

InViewStory.story = {
  name: 'InView (once)'
};

export const InViewNotOnceStory = () => {
  // knobs
  const outerGroupId = 'InView props';
  const initialHeight = text('initialHeight', '175px', outerGroupId);

  const resetHeightToOptions = {
    initial: 'initial',
    mounted: 'mounted',
  };

  const loadedThreshold = number('initialHeight', 300, outerGroupId);
  const resetHeightTo = select('resetHeightTo', resetHeightToOptions, 'mounted', outerGroupId);

  const scrollContainerRef = React.useRef();

  const boxSx = {
    width: '125px',
    height: '125px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginBottom: '50px',
    opacity: 0,
    transition: 'all .3s linear',
    MozTransition: 'all .3s linear',
    WebkitTransition: 'all .3s linear',
    transform: 'translateX(-150px)',
    // Inview child rendered
    '&.rendered': {
      transform: 'translateX(0px)',
      opacity: 1,
    }
  };

  return (
    <>
    <h4>Scroll Container 👇</h4>
    <ScrollContainer ref={scrollContainerRef}>
      <InView
        seqIndex={1}
        initialHeight={initialHeight}
        resetHeightTo={resetHeightTo}
        loadedThreshold={loadedThreshold}
        triggerOnce={false}
        root={scrollContainerRef.current}
      >
        <Box
          sx={boxSx}
          bg={theme.colors.background}
          style={{ color: theme.colors.text }}
        >
          one
        </Box>
      </InView>

      <InView
        seqIndex={2}
        resetHeightTo={resetHeightTo}
        initialHeight={initialHeight}
        loadedThreshold={loadedThreshold}
        triggerOnce={false}
        root={scrollContainerRef.current}
      >
        <Box
          sx={boxSx}
          bg={theme.colors.primary}
        >
          two
        </Box>
      </InView>

      <InView
        seqIndex={3}
        resetHeightTo={resetHeightTo}
        initialHeight={initialHeight}
        loadedThreshold={loadedThreshold}
        triggerOnce={false}
        root={scrollContainerRef.current}
      >
        <Box
          sx={boxSx}
          bg={theme.colors.text}
        >
          three
        </Box>
      </InView>

      <InView
        seqIndex={4}
        resetHeightTo={resetHeightTo}
        initialHeight={initialHeight}
        loadedThreshold={loadedThreshold}
        triggerOnce={false}
        root={scrollContainerRef.current}
      >
        <Box
          sx={boxSx}
          bg={theme.colors.secondary}
        >
          four
        </Box>
      </InView>

    </ScrollContainer>
    </>
  );
};

InViewNotOnceStory.story = {
  name: 'InView (not once)'
};

// TODO: fix, not forwarding the scrolling container so can't demo rootMargin
const ScrollContainer = React.forwardRef((props, scrollContainer) => {
  const wrapperStyles = {
    height: '325px',
    border: '1px solid grey',
    overflowY: 'scroll',
  };

  return (
    <div
      ref={scrollContainer}
      style={wrapperStyles}
    >
      {props.children}
    </div>
  );
});
