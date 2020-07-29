export const login = {
  page: {
    mx: 'auto',
    width: ['full', null, '66.66%', null, 'half'],
  },
  header: {
    mb: t => t.account.space.l,
  },
  content: {
    width: 'full',
    mb: t => t.account.space.l,
    p: t => t.account.space.xxl,
    bg: t => t.account.colors.content,
  },
  signupText: {
    mr: t => t.account.space.s,
  },
};
