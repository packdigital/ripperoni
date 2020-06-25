import deepmerge from 'deepmerge';

import AccountTheme from '@packdigital/gatsby-theme-ripperoni-account/src/gatsby-plugin-theme-ui';
import ComponentsTheme from '@packdigital/gatsby-theme-ripperoni-components/src/gatsby-plugin-theme-ui';


import { fontWeights } from '../theme/fontWeights';
import { borders } from '../theme/borders';
import { borderStyles } from '../theme/borderStyles';
import { borderWidths } from '../theme/borderWidths';
import { breakpoints } from '../theme/breakpoints';
import { buttons } from '../theme/buttons';
import { colors } from '../theme/colors';
import { components } from '../theme/components';
import { fonts } from '../theme/fonts';
import { fontSizes } from '../theme/fontSizes';
import { forms } from '../theme/forms';
import { letterSpacings } from '../theme/letterSpacings';
import { lineHeights } from '../theme/lineHeights';
import { opacities } from '../theme/opacities';
import { radii } from '../theme/radii';
import { shadows } from '../theme/shadows';
import { sizes } from '../theme/sizes';
import { space } from '../theme/space';
import { styles } from '../theme/styles';
import { zIndices } from '../theme/zIndices';


const theme = {
  fontWeights,
  borders,
  borderStyles,
  borderWidths,
  breakpoints,
  buttons,
  colors,
  components,
  fonts,
  fontSizes,
  forms,
  letterSpacings,
  lineHeights,
  opacities,
  radii,
  shadows,
  sizes,
  space,
  styles,
  zIndices,
};

const mergedThemes = deepmerge.all([
  AccountTheme,
  ComponentsTheme,
  theme
]);

export default mergedThemes;
