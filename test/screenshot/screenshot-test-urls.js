import topAppBarVariants from './top-app-bar/variants';
import drawerVariants from './drawer/variants';
import textFieldVariants from './text-field/variants';

const urls = [
  'button',
  'card',
  'checkbox',
  'chips',
  'line-ripple',
  'list',
  'fab',
  'floating-label',
  'icon-button',
  'layout-grid',
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
  'typography',
];

topAppBarVariants.forEach((variant) => {
  urls.push(`top-app-bar/${variant}`);
});

drawerVariants.forEach((variant) => {
  urls.push(`drawer/${variant}`);
});

textFieldVariants.forEach((variant) => {
  urls.push(`text-field/${variant}`);
});

export default urls;
