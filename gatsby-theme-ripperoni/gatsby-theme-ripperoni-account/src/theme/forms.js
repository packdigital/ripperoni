export const forms = {
  account: {
    base: {
      label: {
        fontSize: 1,
        fontWeight: 'bold',
      },
      input: {
        mb: 2,
        width: '100%',
        borderColor: 'gray',
        '&:focus': {
          borderColor: 'primary',
          boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
          outline: 'none',
        },
      },
      select: {
        borderColor: 'gray',
        '&:focus': {
          borderColor: 'primary',
          boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
          outline: 'none',
        },
      },
      textarea: {
        borderColor: 'gray',
        '&:focus': {
          borderColor: 'primary',
          boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
          outline: 'none',
        },
      },
      slider: {
        bg: 'muted',
      },
      button: {
        mt: 3,
      }
    },
    login: {
      variant: 'forms.account.base',
    },
    forgot: {
      variant: 'forms.account.base',
    },
    signUp: {
      variant: 'forms.account.base',
    },
  }
};
