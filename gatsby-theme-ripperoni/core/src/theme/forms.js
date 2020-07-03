export const forms = {
  shared: {
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
    variant: 'forms.shared.input'
  },
  select: {
    variant: 'forms.shared.input'
  },
  textarea: {
    variant: 'forms.shared.input'
  },
};
