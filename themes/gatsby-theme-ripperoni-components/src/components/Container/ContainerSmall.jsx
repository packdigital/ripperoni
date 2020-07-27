/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Container } from './Container';


export const ContainerSmall = forwardRef((props, ref) => {
  ContainerSmall.propTypes = Container.propTypes;

  return (
    <Container
      data-comp={ContainerSmall.displayName}
      ref={ref}
      variant='layout.container.small'
      {...props}
    />
  );
});

ContainerSmall.displayName = 'Container.Small';
