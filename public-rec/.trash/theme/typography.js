const typography = {
  //	font-family
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },

  // font-size
  fontSizes: [
    12, // 0
    14,
    16,
    20,
    24, // 4
    32,
    48,
    64,
    96 // 8
  ],

  // font-weight
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },

  // line-height
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },

  // letter-spacing
  letterSpacings: {
    loose: '1px',
    looser: '2px',
  },
};

typography.fontSizes.base = typography.fontSizes[4];
typography.fontSizes.body = typography.fontSizes[4];
typography.fontSizes.heading = typography.fontSizes[6];

export default typography;
