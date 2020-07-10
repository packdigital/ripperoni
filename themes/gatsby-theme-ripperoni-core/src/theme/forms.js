export const forms = {
  input: {
    p: 3,
    mb: 2,
    borderColor: 'gray',
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
};
