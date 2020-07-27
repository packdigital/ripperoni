/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from 'theme-ui';

import { Container } from './Container';


export const ContainerLarge = forwardRef((props, ref) => {
  ContainerLarge.propTypes = Container.propTypes;

  return (
    <Container
      data-comp={ContainerLarge.displayName}
      ref={ref}
      variant='layout.container.large'
      {...props}
    />
  );
});

ContainerLarge.displayName = 'Container.Large';
