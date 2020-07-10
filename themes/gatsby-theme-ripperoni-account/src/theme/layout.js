export const layout = {
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
    login: {
      py: 7,
      bg: 'gray.0',
    },
    signup: {
      variant: 'layout.pages.login'
    },
    loginSignup: {
      variant: 'layout.pages.login'
    },
    passwordReset: {
      variant: 'layout.pages.login'
    },
    order: {
      variant: 'layout.pages.login'
    },
    orders: {
      variant: 'layout.pages.login'
    },
    addressBook: {
      variant: 'layout.pages.login'
    },
  },
};
