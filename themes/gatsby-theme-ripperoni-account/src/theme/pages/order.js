export const order = {
  shared: {
    section: {
      pb: 5,
      borderBottom: 'default',
      borderColor: 'gray.1',
    },
    line: {
      py: 2,
    },
  },
  header: {
    variant: 'account.pages.shared.loggedIn.header',
  },
  content: {
    variant: 'account.pages.shared.loggedIn.content',
  },
  addresses: {
    variant: 'account.pages.order.shared.section',
    shipping: {
      header: {
        mb: 2,
      },
    },
    fulfillment: {
      header: {
        mb: 2
      },
      company: {},
      trackOrder: {
        variant: 'buttons.primary'
      }
    },
  },
  lineItems: {},
  lineItem: {
    variant: 'account.pages.order.shared.section',
    py: 5,
    image: {
      width: '80px',
    },
    badge: {
      bg: 'background',
      borderRadius: 'circle',
    },
    meta: {
      mx: 5,
      flexDirection: 'column',
    },
    price: {
      ml: 'auto'
    }
  },
  totals: {
    mt: 5,
    pt: 5,
    subtotal: {
      variant: 'account.pages.order.shared.line',
    },
    shipping: {
      variant: 'account.pages.order.shared.line',
    },
    tax: {
      variant: 'account.pages.order.shared.line',
    },
    total: {
      pt: 2,
      mt: 2,
      borderTop: 'default',
      borderColor: 'gray.1'
    },
  },
};
