import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#252525',
  colorSecondary: '#00f7bb',

  // UI
  appBg: 'white',
  appContentBg: '#f2f2f2',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#252525',
  textInverseColor: 'white',

  // Toolbar default and active colors
  barTextColor: 'lightgrey',
  barSelectedColor: '#252525',
  barBg: '#f2f2f2',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: '#252525',
  inputBorderRadius: 0,

  brandTitle: 'Ripperoni UI',
  brandUrl: 'https://packdigital.com',
  // brandImage: '/images/ripperoni-logo.png',
  brandImage: '/images/pd-logo.png',
});