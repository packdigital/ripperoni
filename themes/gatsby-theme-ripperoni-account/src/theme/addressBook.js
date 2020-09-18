export const addressBook = {
  header: {
    mb: t => [t.account.space.xxs, null, null, null, t.account.space.m]
  },
  row: {
    p: t => t.account.space.m,
    mb: t => t.account.space.xxs,
    bg: t => t.account.colors.content,
    controls: {
      edit: {},
      delete: {
        ml: t => t.account.space.s,
      },
    }
  },
  form: {
    p: t => t.account.space.m,
    bg: t => t.account.colors.content,
  },
};
