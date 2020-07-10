export const internal = {
  addressBook: {
    header: {
      variant: 'account.pages.shared.internal.header',
    },
    row: {
      variant: 'account.pages.shared.internal.content',
      mb: 2,
      ctas: {
        button: {
          mx: 2,
        }
      },
    },
    form: {
      variant: 'account.addressBook.row',
    },
  },
  order: {
    header: {
      variant: 'account.pages.shared.internal.header',
    },
    content: {
      variant: 'account.pages.shared.internal.content',
    },
    addresses: {
      pb: 5,
      borderBottom: 'normal',
      borderColor: 'gray.1',
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
    lineItem: {
      variant: 'account.pages.order.addresses',
      py: 5,
      image: {
        width: '80px',
      },
      badge: {
        bg: 'secondary',
        color: 'primary',
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
        py: 2,
      },
      shipping: {
        py: 2,
      },
      tax: {
        py: 2,
      },
      line: {
        variant: 'account.pages.order.total',
        pt: 2,
        borderTop: 'normal',
        borderColor: 'gray.1'
      },
    },
  },
  orders: {
    header: {
      variant: 'account.pages.shared.internal.header',
    },
    content: {
      variant: 'account.pages.shared.internal.content',
    },
    table: {
      header: {
        color: 'gray.3',
        borderBottom: 'normal',
        borderColor: 'gray.1',
      },
      row: {
        py: 3,
        '&:nth-of-type(2n+1)': {
          bg: 'gray.0'
        }
      },
      cell: {
        px: 2,
      }
    },
  },
};
