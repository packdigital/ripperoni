export const links = {
  default: {
    color: 'text',
    cursor: 'pointer',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'text',
    px: 0,
    pb: 1,
    borderRadius: 0,
    borderColor: 'text',
    borderBottom: '1px solid',
    '&:link, &:visited, &:hover, &:active': {
      // color: 'text',
    },
  },
  plain: {
    variant: 'account.links.default',
    p: 0,
    border: '0',
  }
};
