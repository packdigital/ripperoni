export const orders = {
  shared: {
    tableCell: {
      variant: 'text.small',
      textAlign: 'center',
    },
  },
  table: {
    headerRow: {
      cell: {
        variant: 'account.text.orders.shared.tableCell',
        color: 'gray.3',
      },
    },
    cell: {
      orderNumber: {
        variant: 'links.default',
        textAlign: 'center'
      },
      date: {
        variant: 'account.text.orders.shared.tableCell',
      },
      status: {
        variant: 'account.text.orders.shared.tableCell',
      },
      price: {
        variant: 'account.text.orders.shared.tableCell',
      },
    },
  },
};
