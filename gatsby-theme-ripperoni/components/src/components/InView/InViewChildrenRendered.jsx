/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-inner-declarations */
// TODO: replace isBrowser with ripperoni utils (when available)
// TODO: window.clearRequestInterval shims in components or utils module?
import React, { Children, isValidElement, useCallback, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { isBrowser } from '@packdigital/ripperoni-utilities';


// how often to check for threshold (ms)
const TIMER_INTERVAL = 50;

export const InViewChildrenRendered = ({
  children,
  inView,
  renderedThreshold,
  resetHeightTo,
  seqIndex,
  setMounted,
  ...props
  }) => {
  const wrapperRef = useRef(null);
  const observer = useRef(null);
  const [rendered, setRendered] = useState(false);
  // timer state
  const [isActive, setIsActive] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);

  const onMutation = useCallback((mutations) => {
    for (let mutation of mutations) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        const childHeight = mutation.addedNodes[0].offsetHeight;

        // if the child wrapper has a height we use that straight away
        if (childHeight > 0) {
          setRendered(true);
        } else {
          if (!rendered) {
            function resetTimer() {
              setMilliseconds(0);
            }
            resetTimer();
          }
        }
      }
    }
  }, [setMilliseconds, rendered]);

  // timer that updates every 100ms, used by mutation
  // observer to detect idle/finish state.
  useLayoutEffect(() => {
    if (!isBrowser) return;

    let interval = null;
    if (isActive) {
      interval = window.requestInterval(() => {
        if (milliseconds < renderedThreshold) {
          setMilliseconds(milliseconds => milliseconds + TIMER_INTERVAL);
        } else {
          setRendered(true);
        }
      }, TIMER_INTERVAL);
    } else if (!isActive && milliseconds !== 0) {
      if (interval) window.clearRequestInterval(interval);
    }
    return () => {
      if (interval) window.clearRequestInterval(interval);
    };
  }, [isActive, milliseconds, renderedThreshold]);


  // start the mutation observer of the child when not rendered.
  useLayoutEffect(() => {
    if (!isBrowser) return;
    const wrapRef = wrapperRef.current;

    if (rendered) {
      function stopTimer () {
        setIsActive(false);
      }
      // console.info(seqIndex, 'rendered disconnecting observer')
      // Tell parent that children are ready
      stopTimer();
      observer.current.disconnect(wrapperRef.current);
      setMounted(true);

    } else {

      function startTimer() {
        setIsActive(true);
      }
      // Monitor children mounted
      function initMutObs (el, cb) {
        const target = el;
        const options = {
          childList: true,
          subtree: true,
        };
        if (!isBrowser) return null;
        const ob = new MutationObserver(cb);
        ob.observe(target, options);
        return ob;
      }
      startTimer();
      observer.current = initMutObs(wrapperRef.current, onMutation);
    }
    return () => {
      if (observer.current && typeof observer.current === 'function') {
        observer.current.disconnect(wrapRef);
      }
    };
  }, [rendered, setMounted, onMutation]);


  const overFlowStyle = useRef({
    overflowY: resetHeightTo === 'mounted' ? 'hidden' : 'visible',
  });

  return (
    <div
      data-comp={InViewChildrenRendered.displayName}
      ref={wrapperRef}
      style={overFlowStyle.current}
    >
      {observer.current &&
        Children.map(children, (child) => {
          if (!isValidElement(child)) return null;
          return React.cloneElement(child,
            {
              className: rendered ? 'rendered' : 'rendering'
            }
          );
        })
      }
    </div>
  );
};

InViewChildrenRendered.displayName = 'InViewChildrenRendered';

InViewChildrenRendered.propTypes = {
  inView: PropTypes.bool.isRequired,
  loadedThreshold: PropTypes.number,
  resetHeightTo: PropTypes.oneOf(['initial', 'mounted']),
  seqIndex: PropTypes.number,
  setMounted: PropTypes.func.isRequired,
};

InViewChildrenRendered.defaultProps = {
  inView: false,
  loadedThreshold: 300,
  resetHeightTo: 'initial',
  seqIndex: 0,
  setMounted: () => false,
};
