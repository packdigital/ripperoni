export const forms = {
  base: {
    input: {
      borderColor: 'gray',
      '&:focus': {
        outline: 'none',
        borderColor: 'primary',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
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
