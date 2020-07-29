export const order = {
  header: {
    mb: t => [t.account.space.xxs, null, null, null, t.account.space.m],
  },
  content: {
    bg: t => t.account.colors.content,
    p: t => t.account.space.m,
  },
  addresses: {
    borderBottom: t => t.account.borders.default,
    borderColor: t => t.account.colors.border,
    pb: t => t.account.space.m,
    shipping: {
      header: {
        mb: t => t.account.space.xxs,
      },
    },
    fulfillment: {
      header: {
        mb: t => t.account.space.xxs,
      },
      trackOrder: {
        variant: 'buttons.primary'
      }
    },
  },
  lineItem: {
    borderBottom: t => t.account.borders.default,
    borderColor: t => t.account.colors.border,
    pb: t => t.account.space.m,
    py: t => t.account.space.m,
    image: {
      width: '80px',
    },
    badge: {
      borderRadius: 'circle',
      bg: t => t.account.colors.badge,
    },
    meta: {
      flexDirection: 'column',
      mx: t => t.account.space.m,
    },
    price: {
      ml: 'auto'
    }
  },
  totals: {
    mt: t => t.account.space.m,
    pt: t => t.account.space.m,
    subtotal: {
      py: t => t.account.space.xxs,
    },
    shipping: {
      py: t => t.account.space.xxs,
    },
    tax: {
      py: t => t.account.space.xxs,
    },
    total: {
      pt: t => t.account.space.xxs,
      mt: t => t.account.space.xxs,
      borderTop: t => t.account.borders.default,
      borderColor: t => t.account.colors.border,
    },
  },
};
