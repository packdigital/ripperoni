export const layout = {
  shared: {
    pages: {
      py: 7,
      // py: 'account.space.xl',
      bg: 'gray.0',
    }
  },
  contact: {
    justifySelf: ['center', null, null, 'flex-start'],
  },
  contents: {
    mb: [5, null, null, 6],
  },
  grid: {
    gridRowGap: 0,
    gridColumnGap: [null, null, null, 6],
    gridTemplateColumns: ['auto', null, null, 'minmax(auto, 250px)  3fr'],
    gridTemplateRows: [null, null, null, 'repeat(2, max-content)'],
    gridTemplateAreas: [
      `'meta'
       'navigation'
       'contents'
       'contact'`
      ,
      null,
      null,
      `'meta contents'
       'navigation contents'
       'contact contents'`
    ],
  },
  inner: {
    variant: 'layout.container.large',
    px: 5,
    // px: 'account.space.m',
  },
  meta: {
    mb: [3, null, null, 4],
  },
  navigation: {
    mb: [5, null, null, 6],
    item: {
      variant: 'links.plain',
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
  },
  pages: {
    addressBook: {
      variant: 'account.layout.shared.pages',
    },
    login: {
      variant: 'account.layout.shared.pages',
    },
    loginSignup: {
      variant: 'account.layout.shared.pages',
    },
    order: {
      variant: 'account.layout.shared.pages',
    },
    orders: {
      variant: 'account.layout.shared.pages',
    },
    recover: {
      variant: 'account.layout.shared.pages',
    },
    reset: {
      variant: 'account.layout.shared.pages',
    },
    signup: {
      variant: 'account.layout.shared.pages',
    },
  },
};
