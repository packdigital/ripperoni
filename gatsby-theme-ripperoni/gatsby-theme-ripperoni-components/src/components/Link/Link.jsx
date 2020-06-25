/** @jsx jsx */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as LinkUI, jsx } from 'theme-ui';
import TransitionLink from 'gatsby-plugin-transition-link';

import { useSxProps } from '../../hooks/useSxProps';
import * as defaultProps from '../../props/default';
import * as buttonProps from '../../props/button';
import * as typographyProps from '../../props/typography';

import { LinkButton } from './LinkButton';
import { fadeInChildrenSeq, fadeOutPageTemplate } from './LinkAnimations';


export const Link = forwardRef(({
  to,
  href,
  ariaLabel,
  activeClassName,
  target,
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

  const linkProps = to ? { to, ...animationProps } : { href };

  return (
    <LinkUI
      as={to ? TransitionLink : 'a'}
      ref={ref}
      data-comp={Link.displayName}
      aria-label={ariaLabel}
      activeClassName={activeClassName}
      target={target}
      sx={sxObject}
      {...linkProps}
      {...props}
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
  ariaLabel: PropTypes.string,
  activeClassName: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
};
