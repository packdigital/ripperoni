
const body = {
  normal: {
    fontSize: [4],
    fontFamily: 'body',
    fontWeight: 'light',
    lineHeight: 'body',
    letterSpacing: 'body',
  },
  small: {
    fontSize: [1],
    fontFamily: 'body',
    fontWeight: 'bold',
    lineHeight: 'body',
  },
  get default() {
    return this.normal
  }
};

const heading = {
  normal: {
    fontSize: [6],
    fontWeight: 'bold',
    fontFamily: 'heading',
    lineHeight: 'heading',
    letterSpacing: 'heading',
  },
  small: {
    fontSize: [5],
    fontWeight: 'heavy',
    fontFamily: 'heading',
    lineHeight: 'heading',
    letterSpacing: 'heading',
  },
  get default() {
    return this.normal
  }
};

export const text = {
  text: {
    ...body,
    inverted: {
      variant: 'text.body',
      color: 'background'
    }
  },
  heading: {
    ...heading,
    ...heading.normal,
  },
};
