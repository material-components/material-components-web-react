import topAppBarVariants from './top-app-bar/variants';
import drawerVariants from './drawer/variants';

const urls = [
  'button',
  'card',
  'checkbox',
  'chips',
  'line-ripple',
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
  'text-field',
  'text-field/helper-text',
  'text-field/icon',
];

topAppBarVariants.forEach((variant) => {
  urls.push(`top-app-bar/${variant}`);
});

drawerVariants.forEach((variant) => {
  urls.push(`drawer/${variant}`);
});
export default urls;
