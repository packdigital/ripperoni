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
    loggedInPageHeader: {
      variant: 'pages.account.shared.header'
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
      content: {
        variant: 'pages.account.shared.content',
      },
      addresses: {
        pb: 5,
        borderBottom: '1px solid',
        borderColor: 'gray.1'
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
      },
      total: {
        py: 2,
      },
      totalPrice: {
        variant: 'pages.account.order.total',
        mt: 2,
        borderTop: '1px solid',
        borderColor: 'gray.1'
      }
    },
    orders: {
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
          '&:nth-of-type(2n+1)': {
            bg: 'gray.0'
          }
        }
      },
      cell: {
        px: 2,
        my: 3,
      }
    },
    addressBook: {
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
