const title = 'Ripperoni Store';
const description = 'Rest in pepperoni';
const author = 'PackDigital';
const logo = 'logo.png';
const url = 'https://ripperoni.packdigital.com';
const color = '#252525';
const backgroundColor = '#00f7bb';

const site = {
  title,
  description,
  color,
  backgroundColor,
};

const seo = {
  title,
  description,
  author,
  logo,
  color: '#000000',
  backgroundColor: '#FFFFFF',
};

const shop = {
  name: title,
  url,
};

const social = {
  twitter: 'https://twitter.com/packdig',
  instagram: 'https://www.instagram.com/packdig',
  facebook: 'https://www.facebook.com/packdig',
};

module.exports = {
  site,
  seo,
  shop,
  social,
  title,
  description,
  author,
  logo,
  url,
  color,
  backgroundColor,
};
