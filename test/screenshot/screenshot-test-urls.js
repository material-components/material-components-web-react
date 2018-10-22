import topAppBarVariants from './top-app-bar/variants';

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

export default urls;
