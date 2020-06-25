

const common = {
  button: {},
  heading: {
    width: '100%',
  },
  mediaObject: {},
  navigationElement: {},
  text: {},
  section: {},
};

const button = {
  primary: {
    variant: 'buttons.primary',
  },
  secondary: {
    variant: 'buttons.secondary',
  }
};

const heading = {
  normal: {
    ...common.heading,
    variant: 'text.heading',
  },
  display: {
    ...common.heading,
    variant: 'text.heading.display',
  },
  large: {
    ...common.heading,
    variant: 'text.heading.large',
  },
};

const mediaObject = {
  textLeft: {
    variant: 'mediaObject.textLeft'
  },
  mediaLeft: {
    variant: 'mediaObject.mediaLeft'
  },
  textRight: {
    variant: 'mediaObject.textRight'
  },
  mediaRight: {
    variant: 'mediaObject.mediaRight'
  },
};

const navigationElement = {
  default: {},
};

const text = {
  normal: {
    variant: 'text.text.normal'
  },
};

const section = {
  maxWidth: {
    variant: 'layout.withPaddingX',
  },
  fullBleed: {
    variant: 'layout.fullBleed',
  }
};


export default {
  button,
  heading,
  mediaObject,
  navigationElement,
  text,
  section,
};
