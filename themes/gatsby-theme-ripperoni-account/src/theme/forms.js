export const forms = {
  shared: {
    inputs: {
      flexDirection: 'column',
    },
    ctas: {
      flexDirection: 'column',
    },
    submit: {
      variant: 'buttons.primary'
    },
    secondaryCta: {
      variant: 'links.default',
      alignSelf: 'center',
      mt: 4,
    }
  },
  address: {
    header: {
      mb: 3,
      width: '100%',
    },
    firstName: {
      width: ['full', null, null, 'half'],
      pr: [null, null, null, 3],
    },
    lastName: {
      width: ['full', null, null, 'half'],
      pl: [null, null, null, 3],
    },
    address1: {
      width: 'full',
    },
    address2: {
      width: 'full',
    },
    city: {
      width: ['full', null, null, 'half'],
      pr: [null, null, null, 3],
    },
    province: {
      width: ['full', null, null, 'half'],
      pl: [null, null, null, 3],
    },
    zip: {
      width: ['full', null, null, 'half'],
      pr: [null, null, null, 3],
    },
    country: {
      width: ['full', null, null, 'half'],
      pl: [null, null, null, 3],
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
      variant: 'account.forms.shared.inputs'
    },
    ctas: {
      variant: 'account.forms.shared.ctas'
    },
    recoverPassword: {
      variant: 'account.forms.shared.secondaryCta'
    },
    submit: {
      variant: 'account.forms.shared.submit'
    }
  },
  signup: {
    inputs: {
      variant: 'account.forms.shared.inputs'
    },
    ctas: {
      variant: 'account.forms.shared.ctas'
    },
    submit: {
      variant: 'account.forms.shared.submit'
    },
  },
  recover: {
    inputs: {
      variant: 'account.forms.shared.inputs'
    },
    ctas: {
      variant: 'account.forms.shared.ctas'
    },
    cancel: {
      variant: 'account.forms.shared.secondaryCta'
    },
    submit: {
      variant: 'account.forms.shared.submit'
    },
  },
  reset: {
    inputs: {
      variant: 'account.forms.shared.inputs'
    },
    ctas: {
      variant: 'account.forms.shared.ctas'
    },
    submit: {
      variant: 'account.forms.shared.submit'
    },
  },
};
