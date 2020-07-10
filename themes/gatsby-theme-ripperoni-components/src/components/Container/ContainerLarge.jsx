/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Container } from './Container';


export const ContainerLarge = props => {
  ContainerLarge.propTypes = Container.propTypes;

  return (
    <Container
      data-comp={ContainerLarge.displayName}
      variant='layout.container.large'
      {...props}
    />
  );
};

ContainerLarge.displayName = 'Container.Large';
