/* eslint-disable max-lines */
export const text = {
  default: {
    color: 'text',
    fontSize: 3,
    lineHeight: 'text',
    fontFamily: 'text',
  },
  heading: {
    fontSize: 4,
    lineHeight: 'heading',
    fontFamily: 'heading',
  },
  small: {
    fontSize: 2,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  price: {
    color: 'text',
    fontWeight: 'bold'
  },
  compareAtPrice: {
    variant: 'text.price',
    color: 'sale',
    textDecoration: 'line-through',
  },
  email: {
    borderBottom: 'none',
    color: 'gray.3',
  },
  address: {
    variant: 'text.default',
    fontWeight: 300,
  },
  account: {
    shared: {
      default: {
        variant: 'text.default',
      },
      heading: {
        variant: 'text.heading',
      },
      small: {
        variant: 'text.small',
      },
      price: {
        variant: 'text.price',
      },
      compareAtPrice: {
        variant: 'text.compareAtPrice',
      },
      email: {
        variant: 'text.email',
      },
      address: {
        variant: 'text.address',
      }
    },
    meta: {
      heading: {
        variant: 'text.account.shared.heading',
      },
      email: {
        variant: 'text.account.shared.email',
      },
    },
    navigation: {
      variant: 'text.account.shared.small',
    },
    contact: {
      heading: {
        variant: 'text.account.shared.small',
        textAlign: ['center', null, null, 'left'],
      },
      email: {
        variant: 'text.account.shared.email'
      },
    },
    loggedInPageHeader: {
      heading: {
        variant: 'text.account.shared.heading',
      },
    },
    loginSignUp: {
      heading: {
        mobile: {
          variant: 'text.account.shared.heading'
        },
        desktop: {
          variant: 'text.account.shared.heading'
        },
      },
    },
    orders: {
      table: {
        cell: {
          variant: 'text.account.shared.small'
        },
      }
    },
    order: {
      number: {
        variant: 'text.account.shared.heading'
      },
      date: {
        variant: 'text.account.shared.small'
      },
      shippingAddress: {
        heading: {
          variant: 'text.account.shared.small'
        },
        address: {
          variant: 'text.account.shared.address'
        },
      },
      fulfillment: {
        heading: {
          variant: 'text.account.shared.small'
        },
        text: {
          variant: 'text.account.shared.default'
        },
      },
      total: {
        variant: 'text.account.shared.small'
      },
      lineItem: {
        variant: {
          variant: 'text.account.shared.small',
          fontSize: 1,
        },
        title: {
          variant: 'text.account.shared.small'
        },
        price: {
          variant: 'text.account.shared.price'
        },
        compareAtPrice: {
          variant: 'text.account.shared.compareAtPrice'
        },
      }
    },
    addressBook: {
      address: {
        variant: 'text.account.shared.address'
      },
      formHeading: {
        variant: 'text.account.shared.heading'
      },
      formToggle: {

        variant: 'text.account.shared.small'
      }
    },
  }
};
