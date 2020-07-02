export const forms = {
  account: {
    shared: {
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
      variant: 'forms.account.shared',
      fieldGroup: {
        variant: 'forms.account.shared.fieldGroup',
      },
    },
    recover: {
      variant: 'forms.account.shared',
      fieldGroup: {
        variant: 'forms.account.shared.fieldGroup',
      },
    },
    signUp: {
      variant: 'forms.account.shared',
      fieldGroup: {
        variant: 'forms.account.shared.fieldGroup',
      },
    },
    address: {
      variant: 'forms.account.shared',
      fieldGroup: {
        variant: 'forms.account.shared.fieldGroup',
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
