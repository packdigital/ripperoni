/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Container } from './Container';


export const ContainerSmall = props => {
  ContainerSmall.propTypes = Container.propTypes;

  return (
    <Container
      data-comp={ContainerSmall.displayName}
      variant='layout.container.small'
      {...props}
    />
  );
};

ContainerSmall.displayName = 'Container.Small';
