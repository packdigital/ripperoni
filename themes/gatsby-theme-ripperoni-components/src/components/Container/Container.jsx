/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Container as ContainerUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as containerProps from './Container.sx';
import { ContainerSmall } from './ContainerSmall';
import { ContainerLarge } from './ContainerLarge';
import { ContainerFull } from './ContainerFull';


export const Container = forwardRef((incomingProps, ref) => {
  const { sxObject, props } = useSxProps(incomingProps, [containerProps]);

  return (
    <ContainerUI
      ref={ref}
      data-comp={Container.displaName}
      sx={sxObject}
      {...props}
    >
    </ContainerUI>
  );
});

Container.displayName = 'Container';

Container.Small = ContainerSmall;
Container.Large = ContainerLarge;
Container.Full = ContainerFull;

Container.propTypes = {
  ...defaultProps.propTypes,
  contain: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  center: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};
