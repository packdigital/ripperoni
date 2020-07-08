export const forms = {
  base: {
    input: {
      borderColor: 'gray',
      '&:hover, &:active, &:focus': {
        outline: 'none',
        borderColor: 'primary'
      },
    },
  },
  input: {
    variant: 'forms.base.input'
  },
  select: {
    variant: 'forms.base.input'
  },
  textarea: {
    variant: 'forms.base.input'
  },
};
