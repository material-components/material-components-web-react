<a name="0.5.2"></a>
# [0.5.2](https://github.com/material-components/material-components-web-react/compare/v0.5.1...v0.5.2) (2018-10-01)


### Bug Fixes

* **chips:** replace relative path with npm package ([#297](https://github.com/material-components/material-components-web-react/issues/297)) ([96b62f6](https://github.com/material-components/material-components-web-react/commit/96b62f6))
* **icon-button:** add main field to package.json ([#300](https://github.com/material-components/material-components-web-react/issues/300)) ([ead781a](https://github.com/material-components/material-components-web-react/commit/ead781a))
* **infrastructure:** speed up prerelease script ([#288](https://github.com/material-components/material-components-web-react/issues/288)) ([d8674d9](https://github.com/material-components/material-components-web-react/commit/d8674d9))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/material-components/material-components-web-react/compare/v0.5.0...v0.5.1) (2018-09-25)


### Bug Fixes

* **line-ripple:** stop calling foundation.setRippleCenter when argument is NaN ([#287](https://github.com/material-components/material-components-web-react/issues/287)) ([4bbc4fa](https://github.com/material-components/material-components-web-react/commit/4bbc4fa))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/material-components/material-components-web-react/compare/v0.4.2...v0.5.0) (2018-09-25)


### Bug Fixes

* **card:** add missing hasRipple ([#248](https://github.com/material-components/material-components-web-react/issues/248)) ([#255](https://github.com/material-components/material-components-web-react/issues/255)) ([d2f58d6](https://github.com/material-components/material-components-web-react/commit/d2f58d6))
* **chips:** add chip leading icon class management ([#281](https://github.com/material-components/material-components-web-react/issues/281)) ([c638e79](https://github.com/material-components/material-components-web-react/commit/c638e79))
* **chips:** remove handleRemove method for chipsUpdate method ([#282](https://github.com/material-components/material-components-web-react/issues/282)) ([8435079](https://github.com/material-components/material-components-web-react/commit/8435079))
* **chips:** use notifyRemoval and notifyInteraction adapter methods ([#277](https://github.com/material-components/material-components-web-react/issues/277)) ([ba433ea](https://github.com/material-components/material-components-web-react/commit/ba433ea))
* **infrastructure:** add the es5 [@material](https://github.com/material)/package/dist/mdc.package to externals ([#223](https://github.com/material-components/material-components-web-react/issues/223)) ([73fb45b](https://github.com/material-components/material-components-web-react/commit/73fb45b))
* **ripple:** react-ripple does not contain styles ([#172](https://github.com/material-components/material-components-web-react/issues/172)) ([#251](https://github.com/material-components/material-components-web-react/issues/251)) ([ac0f87f](https://github.com/material-components/material-components-web-react/commit/ac0f87f))
* **tab:** update readme and ref name in tab component ([#226](https://github.com/material-components/material-components-web-react/issues/226)) ([f18fda1](https://github.com/material-components/material-components-web-react/commit/f18fda1))
* **tab-bar:** add missing url from screenshot list ([#264](https://github.com/material-components/material-components-web-react/issues/264)) ([dd2f183](https://github.com/material-components/material-components-web-react/commit/dd2f183))
* **tab-bar:** Arrow keys should focus adjacent tab ([#280](https://github.com/material-components/material-components-web-react/issues/280)) ([54224c8](https://github.com/material-components/material-components-web-react/commit/54224c8))
* **tab-indicator:** update component to work with mdc tab ([#215](https://github.com/material-components/material-components-web-react/issues/215)) ([bc41a8b](https://github.com/material-components/material-components-web-react/commit/bc41a8b))
* tab indicator sliding animation broken ([#273](https://github.com/material-components/material-components-web-react/issues/273)) ([c436f58](https://github.com/material-components/material-components-web-react/commit/c436f58))


### Features

* **button:** Add dense variant to button ([#228](https://github.com/material-components/material-components-web-react/issues/228)) ([28b7d6e](https://github.com/material-components/material-components-web-react/commit/28b7d6e))
* **chips:** Update chips to use ids and add input chips ([#246](https://github.com/material-components/material-components-web-react/issues/246)) ([14353ab](https://github.com/material-components/material-components-web-react/commit/14353ab))
* **icon-button:** create component ([#154](https://github.com/material-components/material-components-web-react/issues/154)) ([c7b4cf6](https://github.com/material-components/material-components-web-react/commit/c7b4cf6))
* **infrastructure:** react router screenshots ([#232](https://github.com/material-components/material-components-web-react/issues/232)) ([69e4efe](https://github.com/material-components/material-components-web-react/commit/69e4efe))
* **switch:** Add component ([#208](https://github.com/material-components/material-components-web-react/issues/208)) ([3eb8a4b](https://github.com/material-components/material-components-web-react/commit/3eb8a4b))
* **tab:** add new component ([#216](https://github.com/material-components/material-components-web-react/issues/216)) ([ffd9bba](https://github.com/material-components/material-components-web-react/commit/ffd9bba))
* **tab:** Add ripple ([#261](https://github.com/material-components/material-components-web-react/issues/261)) ([e1918fa](https://github.com/material-components/material-components-web-react/commit/e1918fa))
* **tab-bar:** Add component ([#229](https://github.com/material-components/material-components-web-react/issues/229)) ([731e980](https://github.com/material-components/material-components-web-react/commit/731e980))
* **tab-scroller:** add new component ([#222](https://github.com/material-components/material-components-web-react/issues/222)) ([fedf138](https://github.com/material-components/material-components-web-react/commit/fedf138))


### BREAKING CHANGES

* **chips:** Updated API for `selectedChipIds` and `handleSelect` props in ChipSet and `id` prop in Chip.



<a name="0.4.2"></a>
## [0.4.2](https://github.com/material-components/material-components-web-react/compare/v0.4.1...v0.4.2) (2018-08-14)



<a name="0.4.1"></a>
## [0.4.1](https://github.com/material-components/material-components-web-react/compare/v0.4.0...v0.4.1) (2018-08-13)


### Bug Fixes

* **infrastructure:** point all tests to es6 files for accurate test coverage ([#198](https://github.com/material-components/material-components-web-react/issues/198)) ([4959266](https://github.com/material-components/material-components-web-react/commit/4959266))
* **ripple:** add test to avoid computeBoundingRect error ([#200](https://github.com/material-components/material-components-web-react/issues/200)) ([769b15b](https://github.com/material-components/material-components-web-react/commit/769b15b))
* screenshot increase timeout ([#210](https://github.com/material-components/material-components-web-react/issues/210)) ([e9a2089](https://github.com/material-components/material-components-web-react/commit/e9a2089))
* **text-field:** add missing prop `style` ([#184](https://github.com/material-components/material-components-web-react/issues/184)) ([ff9704d](https://github.com/material-components/material-components-web-react/commit/ff9704d))
* **text-field:** fix typo in readme ([#197](https://github.com/material-components/material-components-web-react/issues/197)) ([f88f180](https://github.com/material-components/material-components-web-react/commit/f88f180))
* **text-field:** update isRtl to a prop ([#195](https://github.com/material-components/material-components-web-react/issues/195)) ([cd7c7c8](https://github.com/material-components/material-components-web-react/commit/cd7c7c8))


### Features

* **select:** add component ([#169](https://github.com/material-components/material-components-web-react/issues/169)) ([e619e52](https://github.com/material-components/material-components-web-react/commit/e619e52))
* **tab-indicator:** add new component ([#202](https://github.com/material-components/material-components-web-react/issues/202)) ([220c823](https://github.com/material-components/material-components-web-react/commit/220c823))


### BREAKING CHANGES

* **text-field:** In order for rtl to work on the Notched Outline component, isRtl will need to be passed in as boolean (default is false). Updating isRtl will result in a re-render.



<a name="0.4.0"></a>
# [0.4.0](https://github.com/material-components/material-components-web-react/compare/v0.3.0...v0.4.0) (2018-07-30)


### Bug Fixes

* **infrastructure:** updated deploy steps to run with docker ([#116](https://github.com/material-components/material-components-web-react/issues/116)) ([a53fc7d](https://github.com/material-components/material-components-web-react/commit/a53fc7d))
* downgraded to es2015 preset to work on ie11 ([#133](https://github.com/material-components/material-components-web-react/issues/133)) ([05c0184](https://github.com/material-components/material-components-web-react/commit/05c0184))
* **material-icon:** removed blocking line and updated documentation ([#155](https://github.com/material-components/material-components-web-react/issues/155)) ([8f3cef5](https://github.com/material-components/material-components-web-react/commit/8f3cef5))
* **ripple:** setState warning when unmounting the component ([#112](https://github.com/material-components/material-components-web-react/issues/112)) ([841a1c8](https://github.com/material-components/material-components-web-react/commit/841a1c8))
* **text-field:** move handleValueChange call when this.props.value updates ([#170](https://github.com/material-components/material-components-web-react/issues/170)) ([f46a34d](https://github.com/material-components/material-components-web-react/commit/f46a34d))
* **top-app-bar:** add material icon imports in screenshot tests ([#168](https://github.com/material-components/material-components-web-react/issues/168)) ([526400b](https://github.com/material-components/material-components-web-react/commit/526400b))
* point packages to MDC Web /dist ES5 files ([#182](https://github.com/material-components/material-components-web-react/issues/182)) ([9d387d3](https://github.com/material-components/material-components-web-react/commit/9d387d3))


### Chores

* **fab:** Pass icon as a prop, not a child element ([#159](https://github.com/material-components/material-components-web-react/issues/159)) ([1569f97](https://github.com/material-components/material-components-web-react/commit/1569f97))


### Features

* **button:** Add an href prop to use anchor tag instead of button ([#174](https://github.com/material-components/material-components-web-react/issues/174)) ([0df9967](https://github.com/material-components/material-components-web-react/commit/0df9967))
* **chips:** Add new component ([#117](https://github.com/material-components/material-components-web-react/issues/117)) ([410da30](https://github.com/material-components/material-components-web-react/commit/410da30))
* **chips:** Add selection to chips ([#121](https://github.com/material-components/material-components-web-react/issues/121)) ([3ef1123](https://github.com/material-components/material-components-web-react/commit/3ef1123))
* **ripple:** Call focus/blur handlers from foundation ([#135](https://github.com/material-components/material-components-web-react/issues/135)) ([c438333](https://github.com/material-components/material-components-web-react/commit/c438333))


### BREAKING CHANGES

* **fab:** Please update your FAB to pass icon as a prop, not as a child element.
* **chips:** Users should render `Chip` components directly instead of passing a `labels` prop to `ChipSet`.



<a name="0.3.0"></a>
# [0.3.0](https://github.com/material-components/material-components-web-react/compare/v0.2.0...v0.3.0) (2018-06-25)


### Bug Fixes

* Moved importer code to webpack.util to share between screen shot test and main build. ([aec8cc8](https://github.com/material-components/material-components-web-react/commit/aec8cc8))
* travis and docker integration ([#92](https://github.com/material-components/material-components-web-react/issues/92)) ([e7f4497](https://github.com/material-components/material-components-web-react/commit/e7f4497))
* updated function name and tests ([7c2794d](https://github.com/material-components/material-components-web-react/commit/7c2794d))
* **line-ripple:** Convert style name to camel case ([#99](https://github.com/material-components/material-components-web-react/issues/99)) ([2a5341c](https://github.com/material-components/material-components-web-react/commit/2a5341c))
* **text-field:** Added SASS importer to lookup the package folder first then fallback to default npm resolve. ([bf7f849](https://github.com/material-components/material-components-web-react/commit/bf7f849))
* **text-field:** Added text-field to valid commit msg list ([3922e2c](https://github.com/material-components/material-components-web-react/commit/3922e2c))
* **text-field:** Updated Input.js to use new public API of foundation ([df0b5ed](https://github.com/material-components/material-components-web-react/commit/df0b5ed))


### Features

* Docker integration into Travis to decrease false negative screenshots ([#91](https://github.com/material-components/material-components-web-react/issues/91)) ([d8b670e](https://github.com/material-components/material-components-web-react/commit/d8b670e))
* updated all packages to 0.36.0 ([#104](https://github.com/material-components/material-components-web-react/issues/104)) ([a1d8b66](https://github.com/material-components/material-components-web-react/commit/a1d8b66))
* **infrastructure:** add .npmignores to packages ([#110](https://github.com/material-components/material-components-web-react/issues/110)) ([ab7009d](https://github.com/material-components/material-components-web-react/commit/ab7009d))
* **infrastructure:** default npm entry point to ES5 ([#108](https://github.com/material-components/material-components-web-react/issues/108)) ([1f0446f](https://github.com/material-components/material-components-web-react/commit/1f0446f))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/material-components/material-components-web-react/compare/v0.1.0...v0.2.0) (2018-06-01)


### Bug Fixes

* Remove scss extensions from [@material](https://github.com/material)/mdc-* imports ([#62](https://github.com/material-components/material-components-web-react/issues/62)) ([46b7f08](https://github.com/material-components/material-components-web-react/commit/46b7f08))
* **button:** Rename stroked to outlined ([#74](https://github.com/material-components/material-components-web-react/issues/74)) ([f612388](https://github.com/material-components/material-components-web-react/commit/f612388))
* **infrastructure:** fixed npm run build error for empty package directories ([#85](https://github.com/material-components/material-components-web-react/issues/85)) ([18666d4](https://github.com/material-components/material-components-web-react/commit/18666d4))
* **infrastructure:** Make all components public ([#43](https://github.com/material-components/material-components-web-react/issues/43)) ([27a1ab1](https://github.com/material-components/material-components-web-react/commit/27a1ab1))
* **ripple:** Trigger on key events ([2248f26](https://github.com/material-components/material-components-web-react/commit/2248f26))


### Features

* **top-app-bar:** Add top app bar fixed variant ([#68](https://github.com/material-components/material-components-web-react/issues/68)) ([fd5790c](https://github.com/material-components/material-components-web-react/commit/fd5790c))
* Added changelog.md ([#88](https://github.com/material-components/material-components-web-react/issues/88)) ([983ca89](https://github.com/material-components/material-components-web-react/commit/983ca89))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/material-components/material-components-web-react/compare/5fd6d86...v0.1.0) (2018-05-09)


### Bug Fixes

* **button:** Update package.json ([507298e](https://github.com/material-components/material-components-web-react/commit/507298e))
* **card:** Update package.json ([fc7a4dd](https://github.com/material-components/material-components-web-react/commit/fc7a4dd))
* **fab:** Update package.json ([efd4703](https://github.com/material-components/material-components-web-react/commit/efd4703))
* **floating-label:** Update package.json ([92cbf2c](https://github.com/material-components/material-components-web-react/commit/92cbf2c))
* **line-ripple:** Update package.json ([b6fc89c](https://github.com/material-components/material-components-web-react/commit/b6fc89c))
* **material-icon:** Update package.json ([18e2508](https://github.com/material-components/material-components-web-react/commit/18e2508))
* **notched-outline:** Update package.json ([8b18779](https://github.com/material-components/material-components-web-react/commit/8b18779))
* **ripple:** Update package.json ([044c308](https://github.com/material-components/material-components-web-react/commit/044c308))
* **text-field:** Update package.json ([fda82fb](https://github.com/material-components/material-components-web-react/commit/fda82fb))
* **top-app-bar:** Update package.json ([06e9d66](https://github.com/material-components/material-components-web-react/commit/06e9d66))


### Features

* remote hosted screenshot testing ([#12](https://github.com/material-components/material-components-web-react/issues/12)) ([98bcdfe](https://github.com/material-components/material-components-web-react/commit/98bcdfe))
* screenshot testing ([#10](https://github.com/material-components/material-components-web-react/issues/10)) ([5fd6d86](https://github.com/material-components/material-components-web-react/commit/5fd6d86))
* **fab:** Add new tests for svg/img ([1f536b7](https://github.com/material-components/material-components-web-react/commit/1f536b7))
* **fab:** Change node to element. ([2b4960e](https://github.com/material-components/material-components-web-react/commit/2b4960e))
* **fab:** Remove empty fab from test. Add waitUntil idle to wait until the stylesheets finish ([43e58d4](https://github.com/material-components/material-components-web-react/commit/43e58d4))
* **fab:** Update class name ([96c2d61](https://github.com/material-components/material-components-web-react/commit/96c2d61))
* **fab:** Update for comments ([9b041d6](https://github.com/material-components/material-components-web-react/commit/9b041d6))
* **fab:** Update for comments ([676ae32](https://github.com/material-components/material-components-web-react/commit/676ae32))
* **fab:** Update for lint ([3748f31](https://github.com/material-components/material-components-web-react/commit/3748f31))
* **fab:** Update package name ([02b7140](https://github.com/material-components/material-components-web-react/commit/02b7140))
