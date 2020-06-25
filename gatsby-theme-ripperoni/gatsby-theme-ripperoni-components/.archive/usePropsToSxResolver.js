// Outputs a valid sx object by mapping boolean
// prop keys to defined style options
// @see: FlexCol.sx.js as an example of these options
export const usePropsToSxResolver = (props, sxOptions) => {
  // console.log('props', props);
  const defaultSx = sxOptions.defaultSx;
  const onlyValidSx = option => option && sxOptions[option]; // filter out props not defined in the comp's Sx spec file
  const onlyTruthy = option => props[option] === true;
  const toSx = option => option && sxOptions[option];
  const toSxPreset = (sxs, option) => {
    // console.log('option', option)
    return ({ ...sxs, ...option });
  };

  const SxObj = Object.keys(props) // i.e [children, sx, center, middle...]
    .filter(onlyValidSx) // [center, midddle...]
    .filter(onlyTruthy) // remove props set to false
    .map(toSx) // [ { justifyContent: center }, { alignItems: center}...]
    .reduce(toSxPreset, { ...defaultSx }); // { display: flex, flexDirection: 'row', justifyContent: center, alignItems: center }

  // allow sx to overwrite a given option
  const mergedSx = { ...SxObj, ...props.sx };

  // props to pass down (excluding sx as its merged bellow)
  const sxLessProps = Object.assign({}, props);
  delete sxLessProps.sx;

  return [mergedSx, sxLessProps];
};
