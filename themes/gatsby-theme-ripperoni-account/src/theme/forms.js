export const forms = {
  account: {
    base: {
      label: {
        variant: 'text.account.shared.small'
      },
      button: {
        mt: 3,
      },
      fieldGroup: {
        mb: 2,
      },
    },
    login: {
      variant: 'forms.account.base',
      fieldGroup: {
        variant: 'forms.account.base.fieldGroup',
      },
    },
    recover: {
      variant: 'forms.account.base',
      fieldGroup: {
        variant: 'forms.account.base.fieldGroup',
      },
    },
    signUp: {
      variant: 'forms.account.base',
      fieldGroup: {
        variant: 'forms.account.base.fieldGroup',
      },
    },
    address: {
      variant: 'forms.account.base',
      fieldGroup: {
        variant: 'forms.account.base.fieldGroup',
        '&:nth-of-type(odd)': {
          pl: [null, null, null, 2],
        },
        '&:nth-of-type(even)': {
          pr: [null, null, null, 2],
        }
      },
    }
  }
};
