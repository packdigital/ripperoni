export const links = {
  normal: {
    fontWeight: 'light',
    color: 'primary',
    fontSize: 4
  },
  underlined: {
    textDecoration: 'underline',
    fontWeight: 'light',
    color: 'primary',
    fontSize: 4
  },
  get default() {
    return this.normal
  }
};