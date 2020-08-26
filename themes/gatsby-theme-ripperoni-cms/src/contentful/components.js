import {
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
  Hero: Hero,
  Section: Container,
};

export const components = {
  ...atoms,
  ...molecules,
};
