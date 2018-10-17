import topAppBarVariants from './top-app-bar/variants';
import textFieldVariants from './text-field/variants';

const urls = [
  'button',
  'card',
  'checkbox',
  'chips',
  'line-ripple',
  'fab',
  'floating-label',
  'icon-button',
  'material-icon',
  'menu-surface',
  'notched-outline',
  'select',
  'tab',
  'tab-bar',
  'tab-indicator',
  'tab-scroller',
  'text-field/helper-text',
  'text-field/icon',
];

topAppBarVariants.forEach((variant) => {
  urls.push(`top-app-bar/${variant}`);
});

textFieldVariants.forEach((variant) => {
  urls.push(`text-field/${variant}`);
});

export default urls;
