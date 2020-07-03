/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Container } from './Container';


export const ContainerSmall = props => {
  ContainerSmall.propTypes = Container.propTypes;

  return (
    <Container
      variant='layout.container.small'
      {...props}
    />
  );
};
