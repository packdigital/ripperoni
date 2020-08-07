/** @jsx jsx */
import { jsx, Box } from 'theme-ui';

import { Image } from '@ripperoni/components';

const ContentfulImage = ({ type, id, image, ...props }) => {
  return (
    <Box
      data-comp={ContentfulImage.displayName}
      data-comp-variant={type}
      {...props}
      >
      <Image
        image={image}
        key={id}
      />
    </Box>
  );
};

export default ContentfulImage;
ContentfulImage.displayName = 'ContentfulImage';