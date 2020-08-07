import camelCase from 'lodash.camelcase';

const generateContentfulVariant = ({ __typename, variant }) => {
  const type = __typename.replace('Contentful', '');
  const parts = ['contentful', camelCase(type), camelCase(variant)];
  const contentfulVariant = parts
    .filter(part => part)
    .join('.');

  return contentfulVariant
};

export default generateContentfulVariant;