/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as LinkUI, jsx } from 'theme-ui';
import TransitionLink from 'gatsby-plugin-transition-link';
// import { Link as GatsbyLink } from 'gatsby';

import { useSxProps } from '../../hooks/useSxProps';
import { LinkButton } from './LinkButton';
// import { fadeInChildrenSeq, fadeOutPageTemplate } from './LinkAnimations';


export const Link = forwardRef(({
  to,
  href,
  animate = true,
  ariaLabel,
  activeClassName,
  target,
  newWindow = false,
  ...incomingProps
}, ref) => {
  const { sxObject, props, propTypes } = useSxProps(incomingProps);

  Link.propTypes = {
    ...propTypes,
    to: PropTypes.string,
    href: PropTypes.string,
    animate: PropTypes.bool,
    ariaLabel: PropTypes.string,
    activeClassName: PropTypes.string,
    target: PropTypes.oneOf(['_blank', '_self']),
    newWindow: PropTypes.bool,
  };

  const animationProps = {
    entry: {
      delay: 0.2,
      // trigger: ({ exit, node }) => fadeInChildrenSeq(exit, node),
    },
    exit: {
      length: 1
      // trigger: ({ exit, node }) => fadeOutPageTemplate(exit, node)
    },
  };

  const linkProps = {
    activeClassName,
    'aria-label': ariaLabel,
    ref: ref,
    target: newWindow && '_blank' || target,
    sx: {
      variant: 'styles.a',
      ...sxObject
    },
    ...(animate ? animationProps : {}),
    ...props
  };

  if (to) {
    return (
      // <GatsbyLink
      <TransitionLink
        data-comp='Internal Link'
        to={to}
        {...linkProps}
      />
    );
  }

  return (
    <LinkUI
      data-comp='External Link'
      href={href}
      {...linkProps}
    />
  );
});

Link.Button = LinkButton;
Link.displayName = 'Link';
