export const internal = {
  address: {
    default: {
      name: {
        variant: 'account.text.shared.loggedIn.address',
      },
      address1: {
        variant: 'account.text.shared.loggedIn.address',
      },
      address2: {
        variant: 'account.text.shared.loggedIn.address',
      },
      company: {
        variant: 'account.text.shared.loggedIn.address',
      },
      cityStateZip: {
        variant: 'account.text.shared.loggedIn.address',
      },
      country: {
        variant: 'account.text.shared.loggedIn.address',
      },
    },
    get shipping() { return this.default },
    get addressBook() { return this.default },
  },
  addressBook: {

  },
  layout: {
    meta: {
      heading: {
        variant: 'account.text.shared.loggedIn.heading',
      },
      email: {
        variant: 'account.text.shared.loggedIn.email',
      },
    },
    navigation: {
      variant: 'text.small',
    },
    contact: {
      heading: {
        variant: 'account.text.shared.loggedIn.smallHeading',
        textAlign: ['center', null, null, 'left'],
      },
      email: {
        variant: 'account.text.shared.loggedIn.email',
      },
    },
  },
  order: {

  },
  orders: {

  },
};
