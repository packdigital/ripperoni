import {
  // Box,
  Button,
  Container,
  Hero,
  Image,
  Link,
  Text,
  Video
} from '@ripperoni/components';


const atoms = {
  ContentfulAtomButton: Button,
  ContentfulAtomImage: Image.Contentful,
  ContentfulAtomLink: Link,
  ContentfulAtomText: Text,
  ContentfulAtomVideo: Video,
};

const molecules = {
  hero: Hero,
  section: Container,
  // section: Box,
};

const pageContainer = {
  ContentfulPageContainer: Container.Full,
};

export const components = {
  ...atoms,
  ...molecules,
  ...pageContainer,
};
