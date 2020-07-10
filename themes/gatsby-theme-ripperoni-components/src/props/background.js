/* eslint-disable import/no-default-export */
import PropTypes from 'prop-types';


const sx = [
  'backgroundPosition',
  'backgroundSize',
  'backgroundRepeat',
  'backgroundAttachment',
];

const alias = {
  bgPosition: 'backgroundPosition',
  bgSize: 'backgroundSize',
  bgRepeat: 'backgroundRepeat',
  bgAttachment: 'backgroundAttachment',
};

const propTypes = {
  position: PropTypes.string,
  size: PropTypes.string,
  repeat: PropTypes.string,
  attachment: PropTypes.string,
};

export default {
  sx,
  alias,
  propTypes,
};
