/** @jsx jsx */
import { jsx, Heading } from 'theme-ui';

const ContentfulHeading = ({ type, id, variant, text, color, alignment, ...props }) => {
  return (
    <Heading
      data-comp={ContentfulHeading.displayName}
      data-comp-variant={type}
      key={id}
      {...props}
      children={text}
      variant={variant}
      sx={{
        color: color,
        textAlign: alignment,
      }}
    />
  );
};

export default ContentfulHeading;
ContentfulHeading.displayName = 'ContentfulHeading';