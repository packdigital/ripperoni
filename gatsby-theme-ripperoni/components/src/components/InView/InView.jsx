/** @jsx jsx */

/**
  TODO:
  - when resetHeightTo == 'mounted' we should set a window-resize handler thats resets
    min-height back to 'initial'  to ensure heights adjust on resize.
  - replace isBrowser import with ripperoni-utils when they are available
**/

import { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import  { jsx } from 'theme-ui';
import { useInView } from 'react-intersection-observer';

import { isBrowser } from '@packdigital/ripperoni-utilities';

import { InViewChildrenRendered } from './InViewChildrenRendered';


export const InView = ({
  children,
  id,
  initialHeight,
  loadedThreshold,
  resetHeightTo,
  root,
  rootMargin,
  seqIndex,
  threshold,
  triggerOnce,
  ...props
  }) => {

  const [mounted, setMounted] = useState(false);
  const [mountedHeight, setMountedHeight] = useState('initial');

  // Monitor the elements in-viewport visibility
  const [ref, inView, entry] = useInView({
    root,
    rootMargin,
    threshold,
    triggerOnce,
  });

  useLayoutEffect(() => {
    if (entry && entry.target) {
      if (mounted) {
        if (resetHeightTo === 'mounted' && entry.target.offsetHeight > 0) {
          setMountedHeight(entry.target.offsetHeight + 1);
        } else {
          setMountedHeight('initial');
        }
      } else {
        setMountedHeight('initial');
      }
    }
  }, [mounted, entry, seqIndex, resetHeightTo]);


  return (
    // Section is a vertical spacer container, that is
    // initially set with the passed minHeight to prevent
    // the layout collapsing, so that we retain IntObs functionality.
    // Section's height auto resets to 'initial' or 'mounted
    // when it's children are detected as mounted;
    <section
      id={id}
      data-comp={`InView-${seqIndex}`}
      data-initial-height={initialHeight}
      data-mounted-height={mountedHeight}
      data-comp-in-view={inView}
      data-comp-root-margin={rootMargin}
      ref={ref}
      css={noScrollBarCss}

      // Must be an inline style
      style={{
        minHeight: mounted ? mountedHeight : initialHeight,
      }}
    >
      { inView && setMounted && loadedThreshold
        ? <InViewChildrenRendered
          inView={inView}
          seqIndex={seqIndex}
          setMounted={setMounted}
          loadedThreshold={loadedThreshold}
          resetHeightTo={resetHeightTo}
          {...props}
          >
            {children}
          </InViewChildrenRendered>
        : null
      }
    </section>
  );
};

InView.displayName = 'InView';

// Prevent scroll bars, this as we can't use overflow-x
const noScrollBarCss = {
  '*::-webkit-scrollbar': {
    // '-webkit-appearance': 'none',
    WebkitAppearance: 'none',
    width: 0
  },
  '*::-webkit-scrollbar-track': {
    // '-webkit-box-shadow': 'none'
    WebkitBoxShadow: 'none'
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: 'white',
    outline: 'none'
  }
};

InView.propTypes = {
  // unique id to help identify the InView instance
  id: PropTypes.string,

  initialHeight: (props, propName, componentName) => {
    // validate is px
    const isPxString = props[propName].indexOf('px') !== -1;

    if (!isPxString) {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Value must be a pixel (px) string.`);
    }
  },

  loadedThreshold: PropTypes.number,

  // allow one child only
  children: PropTypes.element.isRequired,

  // 'mounted' -> will set minHeight to the mounted component's height in px or 'initial'
  resetHeightTo: PropTypes.oneOf(['initial', 'mounted']),

  // observer options
  // root: PropTypes.oneOf([PropTypes.element, null]),
  root: (props, propName, componentName) => {
    const propValue = props[propName];
    const isNull = propValue === null;
    const isDomElement = (
        typeof HTMLElement === 'object' ? propValue instanceof HTMLElement : //DOM2
        propValue && typeof propValue === 'object' && propValue !== null && propValue.nodeType === 1 && typeof propValue.nodeName==='string'
    );

    if (!isDomElement && !isNull) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`.
        Value must be a scrolling DOM element or null if window is the scroll element`
      );
    }
  },
  rootMargin: PropTypes.string, // viewport sizing
  seqIndex: PropTypes.number,
  threshold: PropTypes.number, // component intersection thresholds
  triggerOnce: PropTypes.bool,
};

InView.defaultProps = {
  initialHeight: '350px',
  resetHeightTo: 'initial',
  loadedThreshold: 200,
  root: isBrowser ? document.documentElement : null,
  rootMargin: '0px 0px 0px 0px', // top right bottom left
  threshold: 0,
  triggerOnce: true,
  seqIndex: 0,
  id: '',
};
