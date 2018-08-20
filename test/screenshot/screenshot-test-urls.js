import topAppBarVariants from './top-app-bar/variants';

const urls = [
  '/button',
  '/card',
  // '/chips',
  '/line-ripple',
  '/fab',
  '/floating-label',
  '/material-icon',
  '/notched-outline',
  '/select',
  '/tab',
  '/tab-indicator',
  '/tab-scroller',
  '/text-field',
  '/text-field/helper-text',
  '/text-field/icon',
];

topAppBarVariants.forEach((variant) => {
  urls.push(`/top-app-bar/${variant}`);
});

export default urls;
