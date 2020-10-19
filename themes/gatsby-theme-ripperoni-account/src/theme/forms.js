/* eslint-disable max-lines */
export const forms = {
  address: {
    header: {
      width: '100%',
      mb: t => t.account.space.xs,
    },
    firstName: {
      variant: 'forms.fieldGroup',
      width: ['full', null, null, 'half'],
      pr: t => [null, null, null, t.account.space.xs],
    },
    lastName: {
      variant: 'forms.fieldGroup',
      width: ['full', null, null, 'half'],
      pl: t => [null, null, null, t.account.space.xs],
    },
    address1: {
      variant: 'forms.fieldGroup',
      width: 'full',
    },
    address2: {
      variant: 'forms.fieldGroup',
      width: 'full',
    },
    city: {
      variant: 'forms.fieldGroup',
      width: ['full', null, null, 'half'],
      pr: t => [null, null, null, t.account.space.xs],
    },
    province: {
      variant: 'forms.fieldGroup',
      width: ['full', null, null, 'half'],
      pl: t => [null, null, null, t.account.space.xs],
    },
    zip: {
      variant: 'forms.fieldGroup',
      width: ['full', null, null, 'half'],
      pr: t => [null, null, null, t.account.space.xs],
    },
    country: {
      variant: 'forms.fieldGroup',
      width: ['full', null, null, 'half'],
      pl: t => [null, null, null, t.account.space.xs],
    },
    phone: {
      variant: 'forms.fieldGroup',
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
    email: {
      variant: 'forms.fieldGroup',
    },
    password: {
      variant: 'forms.fieldGroup',
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
    firstName: {
      variant: 'forms.fieldGroup',
    },
    lastName: {
      variant: 'forms.fieldGroup',
    },
    email: {
      variant: 'forms.fieldGroup',
    },
    password: {
      variant: 'forms.fieldGroup',
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
    email: {
      variant: 'forms.fieldGroup',
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
    password: {
      variant: 'forms.fieldGroup',
    },
    ctas: {
      flexDirection: 'column',
    },
    submit: {
      variant: 'buttons.primary',
    },
  },
};
