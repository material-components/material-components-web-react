// @ts-ignore
import topAppBarVariants from './top-app-bar/variants.js';
// @ts-ignore
import drawerVariants from './drawer/variants.js';
import textFieldVariants from './text-field/variants';
const urls = [
  'button',
  'card',
  'checkbox',
  'chips',
  'line-ripple',
  'linear-progress',
  'list',
  'fab',
  'floating-label',
  'icon-button',
  'layout-grid',
  'material-icon',
  'menu-surface',
  'notched-outline',
  'radio',
  'select',
  'tab',
  'tab-bar',
  'tab-indicator',
  'tab-scroller',
  'text-field/helper-text',
  'text-field/icon',
  'typography',
];

topAppBarVariants.forEach((variant: string) => {
  urls.push(`top-app-bar/${variant}`);
});

drawerVariants.forEach((variant: string) => {
  urls.push(`drawer/${variant}`);
});

textFieldVariants.forEach((variant: string) => {
  urls.push(`text-field/${variant}`);
});

export default urls;
