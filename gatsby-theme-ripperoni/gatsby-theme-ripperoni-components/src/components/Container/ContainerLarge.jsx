/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Container } from './Container';


export const ContainerLarge = props => {
  ContainerLarge.propTypes = Container.propTypes;

  return (
    <Container
      maxWidth='container.large'
      {...props}
    />
  );
};
