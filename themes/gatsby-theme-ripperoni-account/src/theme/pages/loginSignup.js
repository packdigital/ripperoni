export const loginSignup = {
  flexDirection: ['column', null, null, 'row'],
  header: {
    mobile: {
      mb: 2,
      display: [null, null, null, 'none'],
      loginToggle: {
        mr: 3
      }
    },
    desktop: {
      mb: 5,
      display: ['none', null, null, 'block'],
    },
  },
  login: {
    pr: [null, null, null, 6],
    width: ['full', null, null, 'half'],
  },
  signup: {
    pl: [null, null, null, 6],
    width: ['full', null, null, 'half'],
  },
};
