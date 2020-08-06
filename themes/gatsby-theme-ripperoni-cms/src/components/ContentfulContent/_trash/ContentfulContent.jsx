/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import { CatchErrors } from '@ripperoni/components';

import generateContentfulVariant from './generateContentfulVariant';

import loadable from '@loadable/component'

import ContentfulHeading from './ContentfulHeading';
import ContentfulText from './ContentfulText';
import ContentfulImage from './ContentfulImage';
// import ContentfulButton from './ContentfulButton';
// import ContentfulHero from './ContentfulHero';
import ContentfulMediaObject from './ContentfulMediaObject.jsx';
// import ContentfulProducts from './ContentfulProducts';
// import ContentfulNavigationElement from './ContentfulNavigationElement';
import ContentfulSection from './ContentfulSection';


const ContentfulContent = props => {
  // console.log(generateContentfulVariant(props))

  return (
    <CatchErrors>
      {
        (() => {
          switch (props.__typename) {
            case 'ContentfulHeading':
              // const ContentfulHeading = loadable(() => import('./ContentfulHeading'));
              return (
                <ContentfulHeading
                  alignment={props.alignment}
                  color={props.color}
                  id={props.id}
                  index={props.index}
                  count={props.count}
                  text={props.headingText}
                  type={props.__typename}
                  variant={generateContentfulVariant(props)}
                />
              )

            case 'ContentfulText':
              // const ContentfulText = loadable(() => import('./ContentfulText'));
              return (
                <ContentfulText
                  alignment={props.alignment}
                  color={props.color}
                  id={props.id}
                  index={props.index}
                  count={props.count}
                  text={props.text.text}
                  type={props.__typename}
                  variant={generateContentfulVariant(props)}
                />
              )

            case 'ContentfulImage':
              // const ContentfulImage = loadable(() => import('./ContentfulImage'));
              return (
                <ContentfulImage
                  id={props.id}
                  index={props.index}
                  count={props.count}
                  image={props.image || props}
                  type={props.__typename}
                  {...props}
                />
              )

            // case 'ContentfulButton':
            //   // const ContentfulButton = loadable(() => import('./ContentfulButton'));
            //   return (
            //     <ContentfulButton
            //       id={props.id}
            //       index={props.index}
            //       count={props.count}
            //       text={props.buttonText}
            //       type={props.__typename}
            //       openLinkInNewTab={props.openLinkInNewTab}
            //       url={props.url}
            //       variant={generateContentfulVariant(props)}
            //     />
            //   )

            // case 'ContentfulHero':
            //   // const ContentfulHero = loadable(() => import('./ContentfulHero'));
            //   return (
            //     <ContentfulHero
            //       backgroundColor={props.backgroundColor}
            //       id={props.id}
            //       index={props.index}
            //       count={props.count}
            //       image={props.image}
            //       textContent={props.textContent}
            //       type={props.__typename}
            //       variant={generateContentfulVariant(props)}
            //     />
            //   )

            case 'ContentfulMediaObject':
              // const ContentfulMediaObject = loadable(() => import('./ContentfulMediaObject'));
              return (
                <ContentfulMediaObject
                  backgroundColor={props.backgroundColor}
                  id={props.id}
                  index={props.index}
                  count={props.count}
                  mediaContent={props.mediaContent}
                  textContent={props.textContent}
                  type={props.__typename}
                  variant={generateContentfulVariant(props)}
                />
              );

            // case 'ContentfulProducts':
            //   // const ContentfulProducts = loadable(() => import('./ContentfulProducts'));
            //   return (
            //     <ContentfulProducts
            //     {...props}
            //       id={props.id}
            //       index={props.index}
            //       count={props.count}
            //       productsHeading={props.productsHeading}
            //       products={props.products}
            //       type={props.__typename}
            //       variant={generateContentfulVariant(props)}
            //       carouselMobile={props.carouselMobile}
            //     />
            //   );

            // case 'ContentfulNavigationElement':
            //   // const ContentfulNavigationElement = loadable(() => import('./ContentfulNavigationElement'));
            //   return (
            //     <ContentfulNavigationElement
            //       heading={props.heading}
            //       id={props.id}
            //       index={props.index}
            //       count={props.count}
            //       image={props.image}
            //       subheading={props.subheading}
            //       type={props.__typename}
            //       url={props.url}
            //       variant={generateContentfulVariant(props)}
            //     />
            //   );

            case 'ContentfulSection':
              // const ContentfulSection = loadable(() => import('./ContentfulSection'));
              return (
                <ContentfulSection
                  backgroundColor={props.backgroundColor}
                  id={props.id}
                  index={props.index}
                  count={props.count}
                  sectionContent={props.sectionContent}
                  type={props.__typename}
                  variant={generateContentfulVariant(props)}
                />
              );

            default:
              return null;
          }
        })()
      }
    </CatchErrors>
  );
};



ContentfulContent.propTypes = {
  __typename: PropTypes.string,
  content: PropTypes.array,
};

export default ContentfulContent;
ContentfulContent.displayName = 'ContentfulContent';