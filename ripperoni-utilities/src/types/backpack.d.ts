export interface OptionValues {
  [key: string]: string[];
}

export interface ProductVariant {
  selectedOptions: SelectedOptions;
}

export interface SelectedOptions {
  [key: string]: string;
}
