export const buttons = {
  primary: {
    cursor: 'pointer',
    px: 3,
    py: 2,
    lineHeight: 1,
    fontFamily: 'text',
    fontWeight: 'text',
    border: 0,
    borderRadius: 0,
    color: 'background',
    bg: 'primary',
    '&:hover': {
      bg: 'secondary'
    }
  },
  plain: {
    variant: 'buttons.primary',
    p: 0,
    color: 'text',
    bg: 'transparent',
    '&:hover': {
      bg: 'transparent'
    }
  }
};
