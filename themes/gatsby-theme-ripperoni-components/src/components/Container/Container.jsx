/** @jsx jsx */
import { forwardRef } from 'react';
import { Container as ContainerUI, jsx } from 'theme-ui';

import { useSxProps } from '../../hooks/useSxProps';
import { ContainerSmall } from './ContainerSmall';
import { ContainerLarge } from './ContainerLarge';
import { ContainerFull } from './ContainerFull';
import ContainerSx from './Container.sx';


export const Container = forwardRef(({
  bg,
  backgroundColor,
  children,
  _content,
  pageContent,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps, ContainerSx);

  Container.propTypes = propTypes;

  if (bg || backgroundColor) {
    return (
      <ContainerUI
        variant='layout.container.full'
        bg={bg || backgroundColor}
      >
        <ContainerUI
          data-comp={Container.displaName}
          ref={ref}
          sx={sxObject}
          {...props}
        >
          {_content || pageContent || children}
        </ContainerUI>
      </ContainerUI>
    );
  }

  return (
    <ContainerUI
      data-comp={Container.displaName}
      ref={ref}
      sx={sxObject}
      {...props}
    >
      {_content || pageContent || children}
    </ContainerUI>
  );
});

Container.Small = ContainerSmall;
Container.Large = ContainerLarge;
Container.Full = ContainerFull;
Container.displayName = 'Container';
