export const layout = {
  account: {
    outer: {
      bg: 'gray.0',
      py: 7,
    },
    inner: {
      variant: 'layout.container.large',
      px: 5,
    },
    content: {
      gridRowGap: 5,
      gridColumnGap: [null, null, null, 6],
    },
    navigationItem: {
      py: 4,
      px: 0,
      textDecoration: 'none',
      borderBottom: '1px solid',
      borderRadius: '0',
      borderColor: 'gray.2',
      ':hover': {
        borderColor: 'text',
      },
      '&.active': {
        borderColor: 'text',
        borderWidth: '2px'
      }
    },
  }
};
