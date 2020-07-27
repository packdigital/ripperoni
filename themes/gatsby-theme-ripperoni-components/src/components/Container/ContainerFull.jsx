/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Container } from './Container';


export const ContainerFull = forwardRef((props, ref) => {
  ContainerFull.propTypes = Container.propTypes;

  return (
    <Container
      data-comp={ContainerFull.displayName}
      ref={ref}
      variant='layout.container.full'
      {...props}
    />
  );
});

ContainerFull.displayName = 'Container.Full';
