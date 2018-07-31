'use strict';

export const isElementRtl = (element) => {
  if (element) {
    const dir = window.getComputedStyle(element).getPropertyValue('direction');
    return dir === 'rtl';
  }
}
