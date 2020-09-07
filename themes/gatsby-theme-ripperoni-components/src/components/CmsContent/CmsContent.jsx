import { cloneElement } from 'react';


export const CmsContent = ({
  children,
  content,
  ...props
}) => {
  if (!children && !content) {
    return null;
  }
  console.log('props', props);

  return Array.isArray(content)
    ? content.map(content => cloneElement(children || content, props))
    : cloneElement(children || content, props);
};

CmsContent.displayName = 'CMS Content';
