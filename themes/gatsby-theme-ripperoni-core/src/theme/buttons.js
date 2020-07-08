export const buttons = {
  base: {
    fontFamily: 'text',
    fontWeight: 'text',
    lineHeight: 1,
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
      bg: 'secondary'
    }
  },
  plain: {
    variant: 'buttons.base',
    fontFamily: 'text',
    p: 0,
    bg: 'transparent',
    color: 'text',
  }
};
