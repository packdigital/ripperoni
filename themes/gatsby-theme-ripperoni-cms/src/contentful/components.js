import {
  Box,
  Button,
  Container,
  Hero,
  Image,
  Link,
  Text
} from '@ripperoni/components';


const atoms = {
  ContentfulAtomButton: Button,
  ContentfulAtomImage: Image.Contentful,
  ContentfulAtomLink: Link,
  ContentfulAtomText: Text,
};

const molecules = {
  hero: Hero,
  section: Box,
  'page-container': Container.Full,
};

const pageContainer = {
  ContentfulPageContainer: Container.Full,
};

export const components = {
  ...atoms,
  ...molecules,
  ...pageContainer,
};
