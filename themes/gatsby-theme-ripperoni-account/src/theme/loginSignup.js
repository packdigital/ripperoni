export const loginSignup = {
  flexDirection: ['column', null, null, 'row'],
  header: {
    mobile: {
      display: [null, null, null, 'none'],
      mb: t => t.account.space.xxs,
      loginToggle: {
        mr: t => t.account.space.xs,
      }
    },
    desktop: {
      display: ['none', null, null, 'block'],
      mb: t => t.account.space.m,
    },
  },
  login: {
    width: ['full', null, null, 'half'],
    pr: t => [null, null, null, t.account.space.l],
  },
  signup: {
    width: ['full', null, null, 'half'],
    pl: t => [null, null, null, t.account.space.l],
  },
};
