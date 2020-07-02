/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Container } from './Container';


export const ContainerFull = props => {
  ContainerFull.propTypes = Container.propTypes;

  return (
    <Container
      variant='layout.container.full'
      {...props}
    />
  );
};
