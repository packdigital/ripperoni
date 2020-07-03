/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/** @jsx jsx */
import { Box, jsx } from 'theme-ui';
import { ErrorBoundary } from 'react-error-boundary';

import { logger } from '../../utility/logger';
import { ErrorFallback } from '../ErrorFallback'; // default error fallback

// set fallback wrapper's dimensions
// based on passed options or use default
const fallBackDimensions = (options) => {
  // check the passed height or width are valid units
  const isValidUnit = prop => {
    const supportedUnits = ['px', '%', 'rem', 'em', 'inherit', 'initial'];
    return supportedUnits.reduce((isValid, unit) => {
      isValid = isValid + prop.includes(unit);
      return isValid;
    }, false);
  };

  const defaultOptions = {
    height: '100%',
    width: 'initial',
  };

  // accepted options
  const compHeight = ( options && typeof options.height === 'string' && isValidUnit(options.height))
    ? options.height
    : defaultOptions.height;

  const compWidth = ( options && typeof options.width === 'string' && isValidUnit(options.width))
    ? options.width
    : defaultOptions.width;

  return [ compHeight, compWidth ];
};

// Returns the fallback component wrapped
// with dimensions (width and height) controls
const getFallBackWrapper = (compWidth, compHeight, FallbackComp) =>
  (props) =>
    <Box
      data-comp='ErrorWrapper'
      {...props}
      sx={{
        '> *' : {
          height: 'initial',
        }
      }}
      style={{
        alignItems: 'center',
        display: 'flex',
        height: compHeight,
        justifyContent: 'center',
        overflow: 'hidden',
        width: compWidth,
      }}
      // eslint-disable-next-line react/no-children-prop
      children={FallbackComp}
    >
    </Box>;


// returns error boundary config obj with
// the dimension-wrapped fallback comp
const getErrorBoudry = (FallBackComponent, options) => {
  const [ compHeight, compWidth ] = fallBackDimensions(options);

  const handleError = error => {
    logger.error(error);
    // TODO: sentry interface here
  };

  let FallbackComp = null;

  // check passed comp is a valid comp
  if (typeof FallBackComponent !== 'undefined' && typeof FallBackComponent === 'function'){
    // use the passed custom fallback
    FallbackComp = FallBackComponent;
  } else {
    // use the default fallback
    FallbackComp = ErrorFallback;
  }

  return {
    FallbackComponent: getFallBackWrapper(compWidth, compHeight,
      <FallbackComp
        sx={{
          fill: 'currentcolor',
          flex: '1 1 auto',
        }}
      />
    ),
    onError: handleError
  };
};

// HOC Component
export const catchErrors = (WrappedComponent, FallBackComponent, options = null ) => {
  const errorBoundry = getErrorBoudry(FallBackComponent, options);
  return (props) => {
    return (
      <ErrorBoundary {...errorBoundry}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};

// Error Component
export const CatchErrors = ({ FallBackComponent, children, options = null }) => {
  const errorBoundry = getErrorBoudry(FallBackComponent, options);
  return (
    <ErrorBoundary {...errorBoundry}>
      {children}
    </ErrorBoundary>
  );
};
