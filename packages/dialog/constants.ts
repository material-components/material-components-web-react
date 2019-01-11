
const BASE = 'mdc-dialog';
const cssClasses = {
  BASE,
  CONTAINER: `${BASE}__container`,
  SURFACE: `${BASE}__surface`,
  TITLE: `${BASE}__title`,
  CONTENT: `${BASE}__content`,
  ACTIONS: `${BASE}__actions`,
  BUTTON: `${BASE}__button`,
  DEFAULT_BUTTON: `${BASE}__button--default`,
  SCRIM: `${BASE}__scrim`,
};

const LAYOUT_EVENTS = ['resize', 'orientationchange'];

export {cssClasses, LAYOUT_EVENTS};
