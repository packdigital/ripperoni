/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as LinkUI, jsx } from 'theme-ui';
// import TransitionLink from 'gatsby-plugin-transition-link';
import { Link as GatsbyLink } from 'gatsby';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as buttonProps from '../../props/button';
import * as typographyProps from '../../props/typography';

import { LinkButton } from './LinkButton';
import { fadeInChildrenSeq, fadeOutPageTemplate } from './LinkAnimations';


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
  const { sxObject, props } = useSxProps(incomingProps, [buttonProps, typographyProps]);

  const animationProps = {
    entry: {
      delay: 0.2,
      trigger: ({ exit, node }) => fadeInChildrenSeq(exit, node),
    },
    exit: {
      trigger: ({ exit, node }) => fadeOutPageTemplate(exit, node)
    },
  };

  const linkProps = {
    activeClassName,
    'aria-label': ariaLabel,
    'data-comp': Link.displayName,
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
      // <TransitionLink
      <GatsbyLink
        to={to}
        {...linkProps}
      />
    );
  }

  return (
    <LinkUI
      href={href}
      {...linkProps}
    />
  );
});

Link.displayName = 'Link';

Link.Button = LinkButton;

Link.propTypes = {
  ...defaultProps.propTypes,
  ...buttonProps.propTypes,
  ...typographyProps.propTypes,
  to: PropTypes.string,
  href: PropTypes.string,
  animate: PropTypes.bool,
  ariaLabel: PropTypes.string,
  activeClassName: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  newWindow: PropTypes.bool,
};
