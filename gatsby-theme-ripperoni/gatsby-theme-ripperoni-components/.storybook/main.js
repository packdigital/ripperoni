module.exports = {
  stories: [
    '../src/components/**/*.stories.(js|jsx|mdx)',
    '../src/ui/**/*.stories.(js|jsx|mdx)'
  ],
  addons: [
    '@storybook/addon-docs/preset',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    // ..addon-notes/register to add it to the main panel
    '@storybook/addon-notes/register-panel',
    '@storybook/addon-links',
    '@react-theming/storybook-addon',
    '@storybook/addon-viewport/register',
  ],
};
