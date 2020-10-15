import {
  Button,
  Container,
  Hero,
  Image,
  Link,
  Products,
  Text,
  Video
} from '@ripperoni/components';


const atoms = {
  ContentfulAtomButton: Button,
  ContentfulAtomImage: Image.Contentful,
  ContentfulAtomLink: Link,
  ContentfulAtomProducts: Products,
  ContentfulAtomText: Text,
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
