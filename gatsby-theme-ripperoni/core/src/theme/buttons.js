export const buttons = {
  shared: {
    cursor: 'pointer',
    borderRadius: 0,
    border: 0,
    px: 3,
    py: 2,
  },
  primary: {
    variant: 'buttons.shared',
    color: 'background',
    bg: 'primary',
    '&:hover': {
      bg: 'secondary'
    }
  },
};
