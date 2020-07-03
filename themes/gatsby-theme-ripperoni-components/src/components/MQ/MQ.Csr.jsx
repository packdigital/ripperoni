/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { useResponsiveValue } from '@theme-ui/match-media';

import { isBrowser } from '@packdigital/ripperoni-utilities';

import { useResponsiveProp } from '../../hooks/useResponsiveProp';


export const MQCsr = ({ comps, location }) => {
  const mqComps = useResponsiveProp({ initItems: comps });

  if (!isBrowser) {
    // SSR just render the wrapper
    return null;
  }

  return mqComps && mqComps.length
    ? <ActiveMQComp
      mqComps={mqComps}
      location={location}
      data-comp={MQCsr.displayName}
      />
    : null;
};

// The component that will be returned for the active MQ
const ActiveMQComp = ({ mqComps }) => useResponsiveValue(mqComps);

MQCsr.displayName = 'MQCsr';

MQCsr.propTypes = {
  comps:PropTypes.arrayOf(PropTypes.oneOf([
    PropTypes.string,
    PropTypes.element
  ])).isRequired,
  location: PropTypes.string
};

MQCsr.defaultProps = {
  comps: [],
  location: '', // optional prop for passing location down
};
