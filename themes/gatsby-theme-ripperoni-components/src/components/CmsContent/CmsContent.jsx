import { cloneElement } from 'react';


export const CmsContent = ({
  children,
  content,
  ...props
}) => {
  return cloneElement(children || content, props);
};

CmsContent.displayName = 'CMS Content';
