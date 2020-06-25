// https://gitmemory.com/issue/system-ui/theme-ui/354/530027261
import theme from '../src/gatsby-plugin-theme-ui';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { ThemeProvider } from 'theme-ui'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemes } from '@react-theming/storybook-addon';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';


// Generate breakpoints based on our theme breakpoints.
const allBreakpoints = ['xs', 's', 'sm', 'm', 'ml', 'l', 'xl'];
const themeStorybookBps = theme.breakpoints.reduce((bps, bp, index) => {
  const name = allBreakpoints[index];
  // substract one to make it play well with story mqs
  const themeUIbpW = (parseInt(bp.split('px')[0]) - 1) + 'px';
  bps[name] = {
    name: name,
    styles: {
      width: themeUIbpW,
      height: '650px',
    }
  }
  return bps;
}, {})


addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  viewport: {
    viewports: {
      // ...INITIAL_VIEWPORTS,
      ...themeStorybookBps
    },
    defaultViewport: 'xs',
  },
});

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}


/**
 * Decorators
 */
addDecorator(withKnobs)
addDecorator(withA11y)

// Theme UI global decorator
const themingDecorator = withThemes(ThemeProvider, [theme]);
addDecorator(themingDecorator)
