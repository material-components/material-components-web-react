<a name="0.12.0"></a>
# [0.12.0](https://github.com/material-components/material-components-web-react/compare/v0.11.0...v0.12.0) (2019-05-01)


### Bug Fixes
* **list** make listitem props optional ([#766](https://github.com/material-components/material-components-web-react/issues/766)) ([ffd7776](https://github.com/material-components/material-components-web-react/commit/ffd7776))
* **top-app-bar** change scrollTop to offsetTop in getViewportScrollY ( ([#832](https://github.com/material-components/material-components-web-react/issues/832)) ([a207b0d](https://github.com/material-components/material-components-web-react/commit/a207b0d))
* Ensure all package.json files have a link to the repo ([#807](https://github.com/material-components/material-components-web-react/issues/807)) ([10f2614](https://github.com/material-components/material-components-web-react/commit/10f2614))
* Remove MDCTextfield Constant External ([#803](https://github.com/material-components/material-components-web-react/issues/803)) ([2269920](https://github.com/material-components/material-components-web-react/commit/2269920))


### Features

* update mdcweb v1.x.x ([#830](https://github.com/material-components/material-components-web-react/issues/830)) ([0f63a69](https://github.com/material-components/material-components-web-react/commit/0f63a69))


### BREAKING CHANGES

* Text-field, select, list have API changes. Please see PR #830 for more details.

<a name="0.11.0"></a>
# [0.11.0](https://github.com/material-components/material-components-web-react/compare/v0.10.0...v0.11.0) (2019-03-19)


### Bug Fixes

* **chips:** update classnames version to 2.2.6 ([#702](https://github.com/material-components/material-components-web-react/issues/702)) ([bfd2986](https://github.com/material-components/material-components-web-react/commit/bfd2986))
* **dialog:** should extend HTMLElement ([#723](https://github.com/material-components/material-components-web-react/issues/723)) ([af449f4](https://github.com/material-components/material-components-web-react/commit/af449f4))
* **infrastructure:** remove duplicate tsconfig properties ([#736](https://github.com/material-components/material-components-web-react/issues/736)) ([582cca3](https://github.com/material-components/material-components-web-react/commit/582cca3))
* **menu-surface:** Hoist menu-surface via a portal ([#500](https://github.com/material-components/material-components-web-react/issues/500),[#628](https://github.com/material-components/material-components-web-react/issues/628)) ([#693](https://github.com/material-components/material-components-web-react/issues/693)) ([41d8750](https://github.com/material-components/material-components-web-react/commit/41d8750))
* **ripple:** ClientRect => defaultrect object ([#754](https://github.com/material-components/material-components-web-react/issues/754)) ([b2f78e8](https://github.com/material-components/material-components-web-react/commit/b2f78e8))
* **ripple:** Use mdc-dom.matches instead of `getMatchesProperty()` ([#706](https://github.com/material-components/material-components-web-react/issues/706)) ([74d07fd](https://github.com/material-components/material-components-web-react/commit/74d07fd))
* **select:** pass state.value to NativeControl as prop.value ([#726](https://github.com/material-components/material-components-web-react/issues/726)) ([09ad132](https://github.com/material-components/material-components-web-react/commit/09ad132))
* classnames@2.2.5 --> classnames@2.2.6 & update imports ([#709](https://github.com/material-components/material-components-web-react/issues/709)) ([230337e](https://github.com/material-components/material-components-web-react/commit/230337e))
* make require props optional ([#737](https://github.com/material-components/material-components-web-react/issues/737)) ([f4e78e7](https://github.com/material-components/material-components-web-react/commit/f4e78e7))
* **select:** prop value should be string only ([#725](https://github.com/material-components/material-components-web-react/issues/725)) ([619d12c](https://github.com/material-components/material-components-web-react/commit/619d12c))
* **snackbar:** Add missing mdcw snackbar dependency ([#714](https://github.com/material-components/material-components-web-react/issues/714)) ([9e6fc92](https://github.com/material-components/material-components-web-react/commit/9e6fc92))
* **tab:** Set initial tabIndex state to -1 ([#690](https://github.com/material-components/material-components-web-react/issues/690)) ([#691](https://github.com/material-components/material-components-web-react/issues/691)) ([9034c98](https://github.com/material-components/material-components-web-react/commit/9034c98))
* **text-field:** make props optional ([#735](https://github.com/material-components/material-components-web-react/issues/735)) ([93e8c15](https://github.com/material-components/material-components-web-react/commit/93e8c15))


### Features

* **drawer:** add innerRef prop ([#758](https://github.com/material-components/material-components-web-react/issues/758)) ([364b0b2](https://github.com/material-components/material-components-web-react/commit/364b0b2))
* **snackbar:** dynamic open ([#708](https://github.com/material-components/material-components-web-react/issues/708)) ([04fe2bf](https://github.com/material-components/material-components-web-react/commit/04fe2bf))
* **tab:** implement setFocusOnActivate ([#722](https://github.com/material-components/material-components-web-react/issues/722)) ([fcd480d](https://github.com/material-components/material-components-web-react/commit/fcd480d))
* **top-app-bar:** add children components for composition ([f3454b6](https://github.com/material-components/material-components-web-react/commit/f3454b6))

<a name="0.10.0"></a>
# [0.10.0](https://github.com/material-components/material-components-web-react/compare/v0.9.3...v0.10.0) (2019-02-19)


### Bug Fixes

* **button:** Support anchor and button HTML attributes ([#679](https://github.com/material-components/material-components-web-react/issues/679)) ([#680](https://github.com/material-components/material-components-web-react/issues/680)) ([be8790e](https://github.com/material-components/material-components-web-react/commit/be8790e))
* **checkbox:** enable name attribute ([#678](https://github.com/material-components/material-components-web-react/issues/678)) ([2c77ab5](https://github.com/material-components/material-components-web-react/commit/2c77ab5))
* **chips:** ChipSet no longer overwrites handle[Interaction|Select|Re… ([#651](https://github.com/material-components/material-components-web-react/issues/651)) ([e0b0946](https://github.com/material-components/material-components-web-react/commit/e0b0946))
* **chips:** copy selectedChipIds before calling setState ([#645](https://github.com/material-components/material-components-web-react/issues/645)) ([37905d3](https://github.com/material-components/material-components-web-react/commit/37905d3))
* **chips:** id shuold be required prop ([#649](https://github.com/material-components/material-components-web-react/issues/649)) ([afc16c8](https://github.com/material-components/material-components-web-react/commit/afc16c8))
* **infrastructure:** fix source mappings under dist directory ([#682](https://github.com/material-components/material-components-web-react/issues/682)) ([9f93ef3](https://github.com/material-components/material-components-web-react/commit/9f93ef3))
* **infrastructure:** Upgrade resemblejs to v3 ([#634](https://github.com/material-components/material-components-web-react/issues/634)) ([53abeac](https://github.com/material-components/material-components-web-react/commit/53abeac))
* **infrastructure:** Windows development ([#662](https://github.com/material-components/material-components-web-react/issues/662)) ([fbc4b26](https://github.com/material-components/material-components-web-react/commit/fbc4b26))
* **list:** renders a list with children which is not DOM ([#674](https://github.com/material-components/material-components-web-react/issues/674)) ([e66a267](https://github.com/material-components/material-components-web-react/commit/e66a267))
* **ripple:** Ripple triggers twice on mobile ([#646](https://github.com/material-components/material-components-web-react/issues/646)) ([6876e62](https://github.com/material-components/material-components-web-react/commit/6876e62))
* **tab:** return ScrollContentWidth ([#633](https://github.com/material-components/material-components-web-react/issues/633)) ([c4a2a01](https://github.com/material-components/material-components-web-react/commit/c4a2a01))
* **text-field:** Do not import constants from [@material](https://github.com/material)/textfield internals ([#639](https://github.com/material-components/material-components-web-react/issues/639)) ([3b3a0ab](https://github.com/material-components/material-components-web-react/commit/3b3a0ab))
* **top-app-bar:** clientHeight unit test ([#668](https://github.com/material-components/material-components-web-react/issues/668)) ([9c7330b](https://github.com/material-components/material-components-web-react/commit/9c7330b))


### Features

* **chips:** implements missing adapter method notifyTrailingIconInteraction ([#653](https://github.com/material-components/material-components-web-react/issues/653)) ([c5e87a6](https://github.com/material-components/material-components-web-react/commit/c5e87a6))
* **fab:** exited ([#661](https://github.com/material-components/material-components-web-react/issues/661)) ([a646a33](https://github.com/material-components/material-components-web-react/commit/a646a33))
* **infrastructure:** Fix screenshot tests for external contributors and pull requests ([#638](https://github.com/material-components/material-components-web-react/issues/638)) ([3d421b1](https://github.com/material-components/material-components-web-react/commit/3d421b1))
* **snackbar:** new component ([#620](https://github.com/material-components/material-components-web-react/issues/620)) ([63e1fce](https://github.com/material-components/material-components-web-react/commit/63e1fce))


### BREAKING CHANGES

* **chips:** renamed chip.props.removeIcon --> chips.props.trailingIcon



<a name="0.9.3"></a>
## [0.9.3](https://github.com/material-components/material-components-web-react/compare/v0.9.2...v0.9.3) (2019-02-14)


### Bug Fixes

* **chips:** null check for checkmark ref ([#677](https://github.com/material-components/material-components-web-react/issues/677)) ([2d22f85](https://github.com/material-components/material-components-web-react/commit/2d22f85))



<a name="0.9.2"></a>
## [0.9.2](https://github.com/material-components/material-components-web-react/compare/v0.9.1...v0.9.2) (2019-01-30)



<a name="0.9.1"></a>
## [0.9.1](https://github.com/material-components/material-components-web-react/compare/v0.9.0...v0.9.1) (2019-01-30)



<a name="0.9.0"></a>
# [0.9.0](https://github.com/material-components/material-components-web-react/compare/v0.8.0...v0.9.0) (2019-01-23)


### Bug Fixes

* **list:** Support null as a child element for ListItem ([#584](https://github.com/material-components/material-components-web-react/issues/584)) ([bf487d7](https://github.com/material-components/material-components-web-react/commit/bf487d7))
* **ripple:** add missing dependency to package.json ([#612](https://github.com/material-components/material-components-web-react/issues/612)) ([f6e4725](https://github.com/material-components/material-components-web-react/commit/f6e4725))
* **ripple:** Adds HTMLElement shim to fix regression for SSR projects ([#592](https://github.com/material-components/material-components-web-react/issues/592)) ([3aaf871](https://github.com/material-components/material-components-web-react/commit/3aaf871))
* **text field:** adds missing adapter method `notifyIconAction` on Icon  ([#600](https://github.com/material-components/material-components-web-react/issues/600)) ([632896a](https://github.com/material-components/material-components-web-react/commit/632896a))
* **top-app-bar:** make top app bar props optional ([#587](https://github.com/material-components/material-components-web-react/issues/587)) ([1585c95](https://github.com/material-components/material-components-web-react/commit/1585c95))


### Features

* **button:** trailing icon support ([#622](https://github.com/material-components/material-components-web-react/issues/622)) ([796850b](https://github.com/material-components/material-components-web-react/commit/796850b))
* **dialog:** new component ([#611](https://github.com/material-components/material-components-web-react/issues/611)) ([555e61f](https://github.com/material-components/material-components-web-react/commit/555e61f))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/material-components/material-components-web-react/compare/v0.7.1...v0.8.0) (2018-12-28)


### Bug Fixes

* **infrastructure:** add declaration package.json ([#572](https://github.com/material-components/material-components-web-react/issues/572)) ([8cb4b1b](https://github.com/material-components/material-components-web-react/commit/8cb4b1b))
* **infrastructure:** condense webpack configuration build step into one json file  ([#571](https://github.com/material-components/material-components-web-react/issues/571)) ([512f3aa](https://github.com/material-components/material-components-web-react/commit/512f3aa))
* **infrastructure:** unit test code coverage for typescript ([#487](https://github.com/material-components/material-components-web-react/issues/487)) ([1170a1f](https://github.com/material-components/material-components-web-react/commit/1170a1f))
* **list:** minification-safe element type comparison ([#509](https://github.com/material-components/material-components-web-react/issues/509)) ([89f5fd2](https://github.com/material-components/material-components-web-react/commit/89f5fd2))
* **select:** defensive foundation check before unmounting - also includes radio, checkbox, text-field ([#512](https://github.com/material-components/material-components-web-react/issues/512)) ([2ee4c80](https://github.com/material-components/material-components-web-react/commit/2ee4c80))
* **top-app-bar:** foundation should be destroyed and reinitialized on variant change ([#519](https://github.com/material-components/material-components-web-react/issues/519)) ([58cfc6f](https://github.com/material-components/material-components-web-react/commit/58cfc6f))
* lint for typings files ([#577](https://github.com/material-components/material-components-web-react/issues/577)) ([8f971a8](https://github.com/material-components/material-components-web-react/commit/8f971a8))
* remove prop-types from package.json ([#576](https://github.com/material-components/material-components-web-react/issues/576)) ([7f38952](https://github.com/material-components/material-components-web-react/commit/7f38952))


### Features

* **button:** typescript ([#508](https://github.com/material-components/material-components-web-react/issues/508)) ([fee5968](https://github.com/material-components/material-components-web-react/commit/fee5968))
* **card:** typescript ([#497](https://github.com/material-components/material-components-web-react/issues/497)) ([c9665bc](https://github.com/material-components/material-components-web-react/commit/c9665bc))
* **checkbox:** typescript support  ([#490](https://github.com/material-components/material-components-web-react/issues/490)) ([02775ac](https://github.com/material-components/material-components-web-react/commit/02775ac))
* **chips:** typescript support ([#493](https://github.com/material-components/material-components-web-react/issues/493)) ([764ed40](https://github.com/material-components/material-components-web-react/commit/764ed40))
* **drawer:** typescript support  ([#494](https://github.com/material-components/material-components-web-react/issues/494)) ([2a91edd](https://github.com/material-components/material-components-web-react/commit/2a91edd))
* **fab:** typescript support ([#495](https://github.com/material-components/material-components-web-react/issues/495)) ([b62c36f](https://github.com/material-components/material-components-web-react/commit/b62c36f))
* **icon-button:** typescript support ([#496](https://github.com/material-components/material-components-web-react/issues/496)) ([e9e29a3](https://github.com/material-components/material-components-web-react/commit/e9e29a3))
* **infrastructure:** add typescript eslint ([#549](https://github.com/material-components/material-components-web-react/issues/549)) ([abee1a8](https://github.com/material-components/material-components-web-react/commit/abee1a8))
* **infrastructure:** build JS from TS ([#547](https://github.com/material-components/material-components-web-react/issues/547)) ([862c110](https://github.com/material-components/material-components-web-react/commit/862c110))
* **layout-grid:** typescript ([#498](https://github.com/material-components/material-components-web-react/issues/498)) ([a25039e](https://github.com/material-components/material-components-web-react/commit/a25039e))
* **linear-progress:** typescript ([#526](https://github.com/material-components/material-components-web-react/issues/526)) ([cffefa0](https://github.com/material-components/material-components-web-react/commit/cffefa0))
* **list:** typescript ([#501](https://github.com/material-components/material-components-web-react/issues/501)) ([3b6c501](https://github.com/material-components/material-components-web-react/commit/3b6c501))
* **material-icon:** typescript ([#525](https://github.com/material-components/material-components-web-react/issues/525)) ([e3373bb](https://github.com/material-components/material-components-web-react/commit/e3373bb))
* **menu-surface:** typescript ([#502](https://github.com/material-components/material-components-web-react/issues/502)) ([94d006d](https://github.com/material-components/material-components-web-react/commit/94d006d))
* **radio:** typescript ([#506](https://github.com/material-components/material-components-web-react/issues/506)) ([af94a3a](https://github.com/material-components/material-components-web-react/commit/af94a3a))
* **ripple:** typescript ([#527](https://github.com/material-components/material-components-web-react/issues/527)) ([4dcf389](https://github.com/material-components/material-components-web-react/commit/4dcf389))
* **select:** typescript  ([#540](https://github.com/material-components/material-components-web-react/issues/540)) ([a3d014a](https://github.com/material-components/material-components-web-react/commit/a3d014a))
* **switch:** typescript ([#530](https://github.com/material-components/material-components-web-react/issues/530)) ([ba058d4](https://github.com/material-components/material-components-web-react/commit/ba058d4))
* **tab:** typescript ([#532](https://github.com/material-components/material-components-web-react/issues/532)) ([206540f](https://github.com/material-components/material-components-web-react/commit/206540f))
* **tab-bar:** typescript ([#535](https://github.com/material-components/material-components-web-react/issues/535)) ([a0709d7](https://github.com/material-components/material-components-web-react/commit/a0709d7))
* **tab-indicator:** typescript ([#545](https://github.com/material-components/material-components-web-react/issues/545)) ([056adb5](https://github.com/material-components/material-components-web-react/commit/056adb5))
* **tab-scroller:** typescript ([#536](https://github.com/material-components/material-components-web-react/issues/536)) ([4582a7d](https://github.com/material-components/material-components-web-react/commit/4582a7d))
* **text-field:** add typescript support ([#550](https://github.com/material-components/material-components-web-react/issues/550)) ([e003fea](https://github.com/material-components/material-components-web-react/commit/e003fea))
* **top app bar:** dense variant ([#520](https://github.com/material-components/material-components-web-react/issues/520)) ([461cce9](https://github.com/material-components/material-components-web-react/commit/461cce9))
* **top-app-bar:** TopAppBarFixedAdjust variants added ([#524](https://github.com/material-components/material-components-web-react/issues/524)) ([e3bb701](https://github.com/material-components/material-components-web-react/commit/e3bb701))
* **top-app-bar:** typescript ([#548](https://github.com/material-components/material-components-web-react/issues/548)) ([8680796](https://github.com/material-components/material-components-web-react/commit/8680796))
* **typography:** typescript ([#521](https://github.com/material-components/material-components-web-react/issues/521)) ([090aa7e](https://github.com/material-components/material-components-web-react/commit/090aa7e))


### BREAKING CHANGES

* **infrastructure:** Remove <package-name>.es.js files. The alternate is now to use the index.tsx files.
* **ripple:** withRipple is no longer the default export.



<a name="0.7.1"></a>
## [0.7.1](https://github.com/material-components/material-components-web-react/compare/v0.6.2...v0.7.1) (2018-11-30)


### Bug Fixes

* added missing comma from golden.json ([#426](https://github.com/material-components/material-components-web-react/issues/426)) ([dfe44dc](https://github.com/material-components/material-components-web-react/commit/dfe44dc))
* **chips:** update to v0.41.0 ([#424](https://github.com/material-components/material-components-web-react/issues/424)) ([e40fec6](https://github.com/material-components/material-components-web-react/commit/e40fec6))
* **drawer:** initialize foundation if props.open updates ([#427](https://github.com/material-components/material-components-web-react/issues/427)) ([36e6316](https://github.com/material-components/material-components-web-react/commit/36e6316))
* **drawer:** replace focus trap with vanilla version ([#437](https://github.com/material-components/material-components-web-react/issues/437)) ([bd7433b](https://github.com/material-components/material-components-web-react/commit/bd7433b))
* **drawer:** update modal screenshot golden ([#482](https://github.com/material-components/material-components-web-react/issues/482)) ([ce0c314](https://github.com/material-components/material-components-web-react/commit/ce0c314))
* **linear-progress:** Add linear progress ([#450](https://github.com/material-components/material-components-web-react/issues/450)) ([f38d575](https://github.com/material-components/material-components-web-react/commit/f38d575))
* **select:** added check for nativeControl element before calling props.setRippleCenter in NativeControl ([#478](https://github.com/material-components/material-components-web-react/issues/478)) ([5baad76](https://github.com/material-components/material-components-web-react/commit/5baad76))
* **tab-bar:** set previousActiveIndex to props.activeIndex initially to avoid tab of undefined error ([#428](https://github.com/material-components/material-components-web-react/issues/428)) ([8e28944](https://github.com/material-components/material-components-web-react/commit/8e28944))
* **text-field:** custom validation ([#430](https://github.com/material-components/material-components-web-react/issues/430)) ([f5c9c35](https://github.com/material-components/material-components-web-react/commit/f5c9c35))
* **text-field:** uncomment test fixed from 0.35.0 ([#404](https://github.com/material-components/material-components-web-react/issues/404)) ([3a908ff](https://github.com/material-components/material-components-web-react/commit/3a908ff))


### Features

* **list:** Add list divider ([#420](https://github.com/material-components/material-components-web-react/issues/420)) ([1b8f38f](https://github.com/material-components/material-components-web-react/commit/1b8f38f))
* **list:** allow semantic tags (mainly, nav on List and a on ListItem) ([#405](https://github.com/material-components/material-components-web-react/issues/405)) ([9672cdb](https://github.com/material-components/material-components-web-react/commit/9672cdb))
* **radio:** add component ([#448](https://github.com/material-components/material-components-web-react/issues/448)) ([fd8747c](https://github.com/material-components/material-components-web-react/commit/fd8747c))
* **typography:** add component ([#378](https://github.com/material-components/material-components-web-react/issues/378)) ([e46acf5](https://github.com/material-components/material-components-web-react/commit/e46acf5))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/material-components/material-components-web-react/compare/v0.6.0...v0.6.2) (2018-11-07)


### Bug Fixes

* **checkbox:** add focusable=false to svg for a11y ([#375](https://github.com/material-components/material-components-web-react/issues/375)) ([c7f3b97](https://github.com/material-components/material-components-web-react/commit/c7f3b97))
* **drawer:** update readme and screenshots to support below top app bar ([#397](https://github.com/material-components/material-components-web-react/issues/397)) ([90adbbe](https://github.com/material-components/material-components-web-react/commit/90adbbe))
* **infrastructure:** increase screenshot timeout to decrease flakes ([#373](https://github.com/material-components/material-components-web-react/issues/373)) ([e96ca10](https://github.com/material-components/material-components-web-react/commit/e96ca10))
* **layout-grid:** remove unit test console warnings ([#379](https://github.com/material-components/material-components-web-react/issues/379)) ([408cdd2](https://github.com/material-components/material-components-web-react/commit/408cdd2))
* **list:** selectedIndex 0 isn't working ([#387](https://github.com/material-components/material-components-web-react/issues/387)) ([4e62aae](https://github.com/material-components/material-components-web-react/commit/4e62aae))
* **text-field:** added reference to input element ([#414](https://github.com/material-components/material-components-web-react/issues/414)) ([ea04dc6](https://github.com/material-components/material-components-web-react/commit/ea04dc6))
* **text-field:** allow for input isValid override ([#374](https://github.com/material-components/material-components-web-react/issues/374)) ([7872856](https://github.com/material-components/material-components-web-react/commit/7872856))
* **text-field:** put foundation on state and do render input unless foundation is present ([#353](https://github.com/material-components/material-components-web-react/issues/353)) ([2cb5d64](https://github.com/material-components/material-components-web-react/commit/2cb5d64))
* **text-field:** remove foundation.setValue call during onChange ([#350](https://github.com/material-components/material-components-web-react/issues/350)) ([36469f7](https://github.com/material-components/material-components-web-react/commit/36469f7))
* **top-app-bar:** add FixedAdjust to npmignore ([#371](https://github.com/material-components/material-components-web-react/issues/371)) ([d4ad675](https://github.com/material-components/material-components-web-react/commit/d4ad675))
* **top-app-bar:** allow react elements in title ([#376](https://github.com/material-components/material-components-web-react/issues/376)) ([f6da361](https://github.com/material-components/material-components-web-react/commit/f6da361))


### Code Refactoring

* **list:** Refactor list item management ([#413](https://github.com/material-components/material-components-web-react/issues/413)) ([1f563d3](https://github.com/material-components/material-components-web-react/commit/1f563d3))


### Features

* **infrastructure:** add verify pkg main to dist script ([#320](https://github.com/material-components/material-components-web-react/issues/320)) ([459c6dd](https://github.com/material-components/material-components-web-react/commit/459c6dd))


### BREAKING CHANGES

* **list:** Event handlers moved from list to list item. New props on list item for focus, follow href, toggle checkbox, and classnames/attributes passed down from list. Remove ID prop from list item.



<a name="0.6.0"></a>
# [0.6.0](https://github.com/material-components/material-components-web-react/compare/v0.5.1...v0.6.0) (2018-10-24)


### Bug Fixes

* **chips:** added npmignore ([#317](https://github.com/material-components/material-components-web-react/issues/317)) ([ac99ac5](https://github.com/material-components/material-components-web-react/commit/ac99ac5))
* **chips:** replace relative path with npm package ([#297](https://github.com/material-components/material-components-web-react/issues/297)) ([93ac25e](https://github.com/material-components/material-components-web-react/commit/93ac25e))
* **icon-button:** add main field to package.json ([#300](https://github.com/material-components/material-components-web-react/issues/300)) ([88d5e4e](https://github.com/material-components/material-components-web-react/commit/88d5e4e))
* **icon-button:** add MIT license to files ([#313](https://github.com/material-components/material-components-web-react/issues/313)) ([97ecb3a](https://github.com/material-components/material-components-web-react/commit/97ecb3a))
* **icon-button:** update main property ([#319](https://github.com/material-components/material-components-web-react/issues/319)) ([e79995d](https://github.com/material-components/material-components-web-react/commit/e79995d))
* **infrastructure:** add more time to screenshot initial wait ([#314](https://github.com/material-components/material-components-web-react/issues/314)) ([375206e](https://github.com/material-components/material-components-web-react/commit/375206e))
* **infrastructure:** fix travis badge on readme ([#331](https://github.com/material-components/material-components-web-react/issues/331)) ([e637782](https://github.com/material-components/material-components-web-react/commit/e637782))
* **infrastructure:** speed up prerelease script ([#288](https://github.com/material-components/material-components-web-react/issues/288)) ([b77819f](https://github.com/material-components/material-components-web-react/commit/b77819f))
* **menu-surface:** fix menu surface unit test typo ([#315](https://github.com/material-components/material-components-web-react/issues/315)) ([8b60622](https://github.com/material-components/material-components-web-react/commit/8b60622))
* **text-field:** Add support for <textarea> ([#118](https://github.com/material-components/material-components-web-react/issues/118)) ([#266](https://github.com/material-components/material-components-web-react/issues/266)) ([d9cff89](https://github.com/material-components/material-components-web-react/commit/d9cff89))
* **text-field:** floating label width calculation when notched ([#347](https://github.com/material-components/material-components-web-react/issues/347)) ([377f250](https://github.com/material-components/material-components-web-react/commit/377f250))
* **top-app-bar:** add fixed adjust component ([#349](https://github.com/material-components/material-components-web-react/issues/349)) ([f1d4be0](https://github.com/material-components/material-components-web-react/commit/f1d4be0))


### Features

* **checkbox:** Add new component ([#296](https://github.com/material-components/material-components-web-react/issues/296)) ([fbe7999](https://github.com/material-components/material-components-web-react/commit/fbe7999))
* Add roses example ([#312](https://github.com/material-components/material-components-web-react/issues/312)) ([04bbd18](https://github.com/material-components/material-components-web-react/commit/04bbd18))
* **drawer:** add new component ([#327](https://github.com/material-components/material-components-web-react/issues/327)) ([d386d5e](https://github.com/material-components/material-components-web-react/commit/d386d5e))
* **list:** Add component ([#339](https://github.com/material-components/material-components-web-react/issues/339)) ([5ff3ecc](https://github.com/material-components/material-components-web-react/commit/5ff3ecc))
* **menu-surface:** add component ([#295](https://github.com/material-components/material-components-web-react/issues/295)) ([034abd0](https://github.com/material-components/material-components-web-react/commit/034abd0))



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



