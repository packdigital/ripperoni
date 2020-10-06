/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as LinkUI, jsx } from 'theme-ui';
import { Link as GatsbyLink } from 'gatsby';

import { useSxProps } from '../../hooks/useSxProps';
import { LinkButton } from './LinkButton';


export const Link = forwardRef(({
  to,
  href,
  url,  // comes from cms
  animate = true,
  ariaLabel,
  activeClassName,
  target,
  newWindow = false,
  children,
  text,
  variant,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Link.propTypes = {
    ...propTypes,
    to: PropTypes.string,
    href: PropTypes.string,
    url: PropTypes.string,
    animate: PropTypes.bool,
    ariaLabel: PropTypes.string,
    activeClassName: PropTypes.string,
    target: PropTypes.oneOf(['_blank', '_self']),
    newWindow: PropTypes.bool,
    variant: PropTypes.string,
  };

  const linkProps = {
    activeClassName,
    'aria-label': ariaLabel,
    ref: ref,
    target: newWindow && '_blank' || target,
    sx: {
      variant: variant || 'styles.a',
      ...sxObject
    },
    state: {
      animate,
      ...props?.state
    },
    ...props
  };

  if (to || url?.[0] === '/') {
    return (
      <GatsbyLink
        data-comp='Internal Link'
        to={to || url}
        {...linkProps}
      >
        {children || text}
      </GatsbyLink>
    );
  }

  return (
    <LinkUI
      data-comp='External Link'
      href={href || url}
      {...linkProps}
    >
      {children || text}
    </LinkUI>
  );
});

Link.Button = LinkButton;
Link.displayName = 'Link';
