const { isBrowser } = require('@packdigital/ripperoni-utilities');


const userGlobalGtm = (pathname = '') => {
  // GLOBAL DATALAYER ON ALL PAGES SHOULD OPTIONALLY HAVE DATA
  if (!isBrowser || !window.dataLayer || !window.ShopifyCustomer) return;

  const { ShopifyCustomer: customer } = window;

  if (customer.logged_in) {
    window.dataLayer.push({
      'visitorType': 'User',
      'customerId': customer.id,
      'customerEmail': customer.email,
      'customerOrdersCount': customer.orders_count,
      'customerTotalSpent': customer.total_spent,
      'cartTotal': '',
      'pageType': pathname.slice(1)
    });

  } else {
    window.dataLayer.push({
      'visitorType': 'Guest',
      'pageType': pathname.slice(1) || 'home'
    });
  }
};

module.exports = ({ location }) => {
  userGlobalGtm(location.pathname);
};
