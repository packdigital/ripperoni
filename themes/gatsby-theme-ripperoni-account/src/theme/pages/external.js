export const external = {
  login: {
    header: {
      variant: 'account.pages.shared.external.header',
    },
    content: {
      variant: 'account.pages.shared.external.content',
    },
    signupText: {
      variant: 'account.pages.shared.external.loginSignupText',
    },
  },
  signup: {
    header: {
      variant: 'account.pages.shared.external.header',
    },
    content: {
      variant: 'account.pages.shared.external.content',
    },
    loginText: {
      variant: 'account.pages.shared.external.loginSignupText',
    },
  },
  recover: {
    header: {
      variant: 'account.pages.shared.external.header',
    },
    content: {
      variant: 'account.pages.shared.external.content',
    },
    signupText: {
      variant: 'account.pages.shared.external.loginSignupText',
    },
  },
  reset: {
    header: {
      variant: 'account.pages.shared.external.header',
    },
    content: {
      variant: 'account.pages.shared.external.content',
    }
  },
  loginSignup: {
    flexDirection: ['column', null, null, 'row'],
    header: {
      mobile: {
        mb: [2, null, null, null, 5],
        display: [null, null, null, 'none'],
        'button:first-of-type': {
          mr: 3
        }
      },
      desktop: {
        mb: [2, null, null, null, 5],
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
  },
};
