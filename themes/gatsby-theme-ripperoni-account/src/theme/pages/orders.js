export const orders = {
  shared: {
    tableCell: {
      flex: 1,
    },
  },
  header: {
    variant: 'account.pages.shared.loggedIn.header',
  },
  content: {
    variant: 'account.pages.shared.loggedIn.content',
  },
  table: {
    headerRow: {
      py: 3,
      borderBottom: 'default',
      borderColor: 'gray.1',
      cell: {
        variant: 'account.pages.orders.shared.tableCell',
      },
    },
    row: {
      py: 3,
    },
    cell: {
      orderNumber: {
        variant: 'account.pages.orders.shared.tableCell',
      },
      date: {
        variant: 'account.pages.orders.shared.tableCell',
      },
      status: {
        variant: 'account.pages.orders.shared.tableCell',
      },
      price: {
        variant: 'account.pages.orders.shared.tableCell',
      },
    },
  },
};
