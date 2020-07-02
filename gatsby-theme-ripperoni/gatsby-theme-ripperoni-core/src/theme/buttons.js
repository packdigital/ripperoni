export const buttons = {
  base: {
    cursor: 'pointer',
    borderRadius: 0,
    border: 0,
    px: 3,
    py: 2,
  },
  primary: {
    variant: 'buttons.base',
    color: 'background',
    bg: 'primary',
    '&:hover': {
      bg: 'secondary',
    }
  },
  secondary: {
    variant: 'buttons.primary',
    color: 'background',
    bg: 'secondary',
    '&:hover': {
      bg: 'primary',
    }
  },
};
