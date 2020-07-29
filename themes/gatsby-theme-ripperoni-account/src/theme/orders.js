export const orders = {
  header: {
    mb: t => [t.account.space.xxs, null, null, null, t.account.space.m],
  },
  content: {
    p: t => t.account.space.m,
    bg: t => t.account.colors.content,
  },
  table: {
    headerRow: {
      py: t => t.account.space.xs,
      borderBottom: t => t.account.borders.default,
      borderColor: t => t.account.colors.border,
    },
    headerCell: {
      orderNumber: {
        flex: 1,
      },
      date: {
        flex: 1,
      },
      status: {
        flex: 1,
      },
      price: {
        flex: 1,
      },
    },
    row: {
      py: t => t.account.space.xs,
    },
    cell: {
      orderNumber: {
        flex: 1,
      },
      date: {
        flex: 1,
      },
      status: {
        flex: 1,
      },
      price: {
        flex: 1,
      },
    },
  },
};
