/* eslint-disable import/no-named-as-default */
import gsap, { Elastic } from 'gsap';


const REVEAL_INTERVAL = .25; // seconds(?)
const REVEAL_DURATION = .3;

const fadeZoomOut = node => {
  if (!node) return;
  const tween = gsap.fromTo(
      node,
      // from
      {
        opacity: 1,
        scale: 1,
      },
      // to
      {
        opacity: 0,
        scale: .96,
        duration: REVEAL_DURATION,
        delay: 0,
        ease: Elastic.easeOut
      }
  );
  if (tween) tween.play();
  return node;
};


export const fadeOutPageTemplate = (exit, node) => {
  if (!node) return;

  // prevent page jump.
  node.parentNode.style.minHeight = '100vh';

  // hide page node at once
  fadeZoomOut(node);
};


export const fadeInChildrenSeq = async (exit, node) => {
  if (!node) return;

  // Scroll to the top
  const Layout = document.querySelector('[data-comp="Layout"]');
  if (Layout) Layout.scrollTo({ top: 0, left: 0 });

  // Get page/template children to fadeIn
  let children = Array.from(node.children);
  if (!children) return;
  if (children.length === 1) {
    // page/template is wrapped in a container. We dig a level down to find the real children.
    children = Array.from(children[0].childNodes);
  }

  let tween = null;
  // reveal each section on the page/template sequencially.
  // const childrenCount = children.length - 1;

  children.forEach((child, index) => {
    tween = gsap.fromTo(
      child,
      // from
      {
        opacity: 0
      },
      // to
      {
        opacity: 1,
        duration: REVEAL_DURATION,
        delay: index * REVEAL_INTERVAL,
        ease: Elastic.easeOut,
        onComplete: () => {
          // scroll to top again on fadeIns complete
          // if (index == childrenCount) {
            // Layout.scrollTo({top: 0, left: 0, behavior: 'smooth'})
          //}
        }
      },
    );

    if (tween) tween.play();
  });
};
