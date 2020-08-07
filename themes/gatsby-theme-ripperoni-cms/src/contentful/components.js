import { Button, Hero, Image, Link, Text } from '@ripperoni/components';


const atoms = {
  ContentfulAtomButton: Button,
  ContentfulAtomImage: Image.Contentful,
  ContentfulAtomLink: Link,
  ContentfulAtomText: Text,
};

const molecules = {
  Hero: Hero,
};

export const components = {
  ...atoms,
  ...molecules,
};
