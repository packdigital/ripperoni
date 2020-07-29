export const forms = {
  address: {
    header: {
      width: '100%',
      mb: t => t.account.space.xs,
    },
    firstName: {
      width: ['full', null, null, 'half'],
      pr: t => [null, null, null, t.account.space.xs],
    },
    lastName: {
      width: ['full', null, null, 'half'],
      pl: t => [null, null, null, t.account.space.xs],
    },
    address1: {
      width: 'full',
    },
    address2: {
      width: 'full',
    },
    city: {
      width: ['full', null, null, 'half'],
      pr: t => [null, null, null, t.account.space.xs],
    },
    province: {
      width: ['full', null, null, 'half'],
      pl: t => [null, null, null, t.account.space.xs],
    },
    zip: {
      width: ['full', null, null, 'half'],
      pr: t => [null, null, null, t.account.space.xs],
    },
    country: {
      width: ['full', null, null, 'half'],
      pl: t => [null, null, null, t.account.space.xs],
    },
    phone: {
      width: 'full',
    },
    ctas: {
      width: 'full',
    },
    saveAddress: {
      variant: 'buttons.primary',
      width: 'half',
    },
    cancelAddress: {
      variant: 'buttons.plain',
      width: 'half',
    },
  },
  login: {
    inputs: {
      flexDirection: 'column',
    },
    ctas: {
      flexDirection: 'column',
    },
    recoverPassword: {
      variant: 'links.default',
      alignSelf: 'center',
      mt: t => t.account.space.s,
    },
    submit: {
      variant: 'buttons.primary',
    }
  },
  signup: {
    inputs: {
      flexDirection: 'column',
    },
    ctas: {
      flexDirection: 'column',
    },
    submit: {
      variant: 'buttons.primary',
    },
  },
  recover: {
    inputs: {
      flexDirection: 'column',
    },
    ctas: {
      flexDirection: 'column',
    },
    cancel: {
      variant: 'links.default',
      alignSelf: 'center',
      mt: t => t.account.space.s,
    },
    submit: {
      variant: 'buttons.primary',
    },
  },
  reset: {
    inputs: {
      flexDirection: 'column',
    },
    ctas: {
      flexDirection: 'column',
    },
    submit: {
      variant: 'buttons.primary',
    },
  },
};
