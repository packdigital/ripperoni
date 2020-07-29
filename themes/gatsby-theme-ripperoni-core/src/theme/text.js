export const text = {
  default: {
    fontSize: 3,
    color: 'text',
    lineHeight: 'text',
    fontFamily: 'text',
    fontWeight: 'text',
  },
  heading: {
    fontSize: 4,
    color: 'text',
    lineHeight: 'heading',
    fontFamily: 'heading',
    fontWeight: 'heading',
  },
  small: {
    fontSize: 2,
    color: 'text',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  price: {
    variant: 'text.default',
    whiteSpace: 'nowrap',
  },
  compareAtPrice: {
    variant: 'text.price',
    color: 'sale',
    textDecoration: 'line-through',
  },
  sale: {
    variant: 'text.compareAtPrice'
  },
  email: {
    variant: 'text.default',
    borderBottom: 'none',
    color: 'gray.3',
  },
};
