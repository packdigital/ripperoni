export const forms = {
  input: {
    p: 3,
    borderColor: 'gray.2',
    '&:hover, &:active, &:focus': {
      outline: 'none',
      borderColor: 'primary'
    },
  },
  select: {
    variant: 'account.forms.input',
  },
  textarea: {
    variant: 'account.forms.input',
  },
  fieldGroup: {
    mb: 2,
  },
};
