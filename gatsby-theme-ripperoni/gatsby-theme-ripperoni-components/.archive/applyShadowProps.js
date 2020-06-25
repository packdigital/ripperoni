export const applyShadowedProps = (componentVariant, options) => {
  // i.e ["base", "pl", "pr", "pt", "pb", "contain"]
  const shadowedOptions = Object.keys(componentVariant).map(key => key)

  shadowedOptions.forEach(optionKey => {
    if (options[optionKey]) {
      // overwrite local default option
      // with the config/shadowing of a projects' theme/components.js
      options[optionKey] = componentVariant[optionKey]
    }
  })

  return options;
}
