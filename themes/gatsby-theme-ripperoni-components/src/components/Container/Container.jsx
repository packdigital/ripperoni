/** @jsx jsx */
import { forwardRef } from 'react';
import { Container as ContainerUI, jsx } from 'theme-ui';

import { useSxProps } from '@ripperoni/components/hooks/useSxProps';

import { ContainerSmall } from './ContainerSmall';
import { ContainerLarge } from './ContainerLarge';
import { ContainerFull } from './ContainerFull';
import ContainerSx from './Container.sx';


export const Container = forwardRef(({
  children,
  _content,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps, ContainerSx);

  Container.propTypes = propTypes;

  return (
    <ContainerUI
      data-comp={Container.displaName}
      ref={ref}
      sx={sxObject}
      {...props}
    >
      {_content || children}
    </ContainerUI>
  );
});

Container.Small = ContainerSmall;
Container.Large = ContainerLarge;
Container.Full = ContainerFull;
Container.displayName = 'Container';
