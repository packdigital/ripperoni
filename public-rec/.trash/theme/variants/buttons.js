const primary = {
  py: 3,
  lineHeight: 1,
  bg: 'primary',
  color: 'secondary',
  fontSize: 2,
  fontWeight: 'bold',
  letterSpacing: 'loose',
  border: 'normal',
  borderRadius: 0,
  borderColor: 'primary',
  cursor: 'pointer',
  transition: 'color, background-color 300ms',
  px: 6,
  '&:hover': {
    bg: 'secondary',
    color: 'primary',
    fill: 'primary'
  },
};

const secondary = {
  variant: 'buttons.primary',
  fontSize: 3,
  bg: 'transparent',
  borderColor: 'secondary',
}

const disabled = {
  variant: 'buttons.primary',
  bg: 'disabled',
  borderColor: 'disabled',
  cursor: 'pointer',
  '&:hover': {
    bg: 'disabled',
    color: 'secondary',
  },
};

const text = {
  p: 0,
  bg: 'transparent',
  cursor: 'pointer',
  border: 0,
  textDecoration: 'underline',
}


export const buttons = {
  primary,
  secondary,
  disabled,
  text,
  get default() {
    return this.primary
  }
};
