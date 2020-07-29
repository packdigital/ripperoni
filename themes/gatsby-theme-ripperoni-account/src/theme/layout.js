export const layout = {
  contact: {
    justifySelf: ['center', null, null, 'flex-start'],
  },
  contents: {
    mb: t => [t.account.space.m, null, null, t.account.space.l],
  },
  grid: {
    gridRowGap: 0,
    gridColumnGap: t => [null, null, null, t.account.space.l],
    gridTemplateColumns: ['auto', null, null, 'minmax(auto, 250px)  3fr'],
    gridTemplateRows: [null, null, null, 'repeat(2, max-content)'],
    gridTemplateAreas: [
      `'meta'
       'navigation'
       'contents'
       'contact'
      `,
      null,
      null,
      `'meta contents'
       'navigation contents'
       'contact contents'
      `
    ],
  },
  inner: {
    variant: 'layout.container.large',
    px: t => t.account.space.m,
  },
  meta: {
    mb: t => [t.account.space.xs, null, null, t.account.space.s],
  },
  navigation: {
    mb: t => [t.account.space.m, null, null, t.account.space.l],
    item: {
      variant: 'links.plain',
      px: 0,
      py: t => t.account.space.s,
      textDecoration: 'none',
      borderBottom: t => t.account.borders.navigation,
      borderRadius: 'none',
      borderColor: t => t.account.colors.border,
      color: 'text',
      '&:hover': {
        borderColor: 'text',
      },
      '&.active': {
        borderColor: 'text',
        borderWidth: '2px'
      }
    },
  },
  addressBook: {
    py: t => t.account.space.xl,
    bg: t => t.account.colors.page,
  },
  login: {
    py: t => t.account.space.xl,
    bg: t => t.account.colors.page,
  },
  loginSignup: {
    py: t => t.account.space.xl,
    bg: t => t.account.colors.page,
  },
  order: {
    py: t => t.account.space.xl,
    bg: t => t.account.colors.page,
  },
  orders: {
    py: t => t.account.space.xl,
    bg: t => t.account.colors.page,
  },
  recover: {
    py: t => t.account.space.xl,
    bg: t => t.account.colors.page,
  },
  reset: {
    py: t => t.account.space.xl,
    bg: t => t.account.colors.page,
  },
  signup: {
    py: t => t.account.space.xl,
    bg: t => t.account.colors.page,
  },
};
