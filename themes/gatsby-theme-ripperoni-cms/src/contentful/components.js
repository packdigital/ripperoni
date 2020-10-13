import {
  Button,
  Container,
  Hero,
  Image,
  Link,
  Markdown,
  Products,
  // Text,
  Video
} from '@ripperoni/components';


const atoms = {
  ContentfulAtomButton: Button,
  ContentfulAtomImage: Image.Contentful,
  ContentfulAtomLink: Link,
  ContentfulAtomProducts: Products,
  // ContentfulAtomText: Text,
  ContentfulAtomText: Markdown,
  ContentfulAtomVideo: Video,
};

const molecules = {
  hero: Hero,
  section: Container,
};

const pageContainer = {
  ContentfulPageContainer: Container.Full,
};

export const components = {
  ...atoms,
  ...molecules,
  ...pageContainer,
};
