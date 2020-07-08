export const pages = {
  account: {
    shared: {
      header: {
        mb: 5,
      },
      content: {
        p: 5,
        bg: 'white',
      }
    },
    loginSignUp: {
      header: {
        mobile: {
          variant: 'pages.account.shared.header',
          'button:first-of-type': {
            mr: 3
          }
        },
        desktop: {
          variant: 'pages.account.shared.header',
        },
      },
      login: {
        pr: [null, null, null, 6],
      },
      signUp: {
        pl: [null, null, null, 6],
      },
    },
    order: {
      header: {
        variant: 'pages.account.shared.header'
      },
      content: {
        variant: 'pages.account.shared.content',
      },
      addresses: {
        pb: 5,
        borderBottom: '1px solid',
        borderColor: 'gray.1',
        trackOrder: {
          variant: 'buttons.primary'
        }
      },
      fulfillment: {
        header: {
          mb: 1
        },
        company: {
          mb: 4
        },
      },
      lineItem: {
        py: 5,
        borderBottom: '1px solid',
        borderColor: 'gray.1',
        meta: {
          mx: 4
        },
        price: {
          ml: 'auto'
        }
      },
      totals: {
        mt: 5,
        pt: 5,
      },
      total: {
        py: 2,
      },
      totalPrice: {
        variant: 'pages.account.order.total',
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'gray.1'
      }
    },
    orders: {
      header: {
        variant: 'pages.account.shared.header'
      },
      content: {
        variant: 'pages.account.shared.content',
      },
      table: {
        header: {
          color: 'gray.3',
          borderColor: 'gray.1',
          borderBottom: '1px solid',
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
    addressBook: {
      header: {
        variant: 'pages.account.shared.header'
      },
      row: {
        variant: 'pages.account.shared.content',
        mb: 2,
      },
      form: {
        variant: 'pages.account.shared.content',
        mb: 2,
        header: {
          mb: 3,
        },
      },
      formControls: {
        button: {
          mx: 2,
        }
      },
    },
  }
};
