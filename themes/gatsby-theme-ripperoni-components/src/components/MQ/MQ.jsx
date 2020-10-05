// import React from 'react';
import { useBreakpointIndex } from '@theme-ui/match-media';
import PropTypes from 'prop-types';

import { useResponsiveProp } from '../../hooks/useResponsiveProp';
import { MQCsr } from './MQ.Csr';


export const MQ = ({ comps }) => {
  const mqComps = useResponsiveProp({ initItems: comps });

  // Below is an implementation that adds/removes the component instead of hiding/showing it
  //
  const index = useBreakpointIndex();

  return mqComps[index];


  // // Below is used because sometimes we render the wrong component initially?
  // //
  // const toUniqueDisplaySxArrays = (sxArr, comp, index) => {
  //   sxArr[index] = mqComps.map((mqComp) => {
  //     if (mqComp === comp) return 'inherit';
  //     else return 'none';
  //   });

  //   return sxArr;
  // };

  // const toDisplaySxWrapped = (displaySx, index) => {
  //   if ( !uniqueComps[index] ) return null;
  //   return (
  //     <div
  //       key={`MQ-${index}-${uniqueComps[index].type.displayName}`}
  //       className={`${uniqueComps[index].type.displayName}` || ''}
  //       sx={{ ...uniqueComps[index].props.sx, display: displaySx }}
  //     >
  //       {uniqueComps[index]}
  //     </div>
  //   );
  // };

  // // eslint-disable-next-line no-undef
  // const uniqueComps =  [...new Set(mqComps)];

  // return uniqueComps
  //   .reduce(toUniqueDisplaySxArrays, [])
  //   .map(toDisplaySxWrapped);
};

MQ.displayName = 'MQ';

MQ.propTypes = {
  comps:PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.element
  ])).isRequired,
  location: PropTypes.string
};

MQ.defaultProps = {
  comps: []
};

MQ.Csr = MQCsr;
