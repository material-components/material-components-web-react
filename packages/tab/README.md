>  Are you a part of the Material Design web community? Help us improve by filling out ✨<a href='https://bit.ly/materialwebsurvey'>**this 10 minute survey**</a>✨.

# React Tab

A React version of an [MDC Tab](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab).

## Installation

```
npm install @material/react-tab
```

## Usage

### Styles

with Sass:
```scss
import '@material/react-tab/index.scss';
```

with CSS:
```css
import '@material/react-tab/dist/tab.css';
```

### Javascript Instantiation

#### With an Underline (default)

```js
import React from 'react';
import Tab from '@material/react-tab';
import MaterialIcon from '@material/react-material-icon';

class MyApp extends React.Component {
  state = {active: false};

  render() {
    return (
      <Tab active={this.state.active}>
        <MaterialIcon className='mdc-tab__icon' icon='favorite' />
        <span className='mdc-tab__text-label'>Love</span>
      </Tab>
    );
  }
}
```

#### With Custom Indicator

Possibly you don't want to use the default underline indicator, but instead would like to use an icon. You'll need to add an `indicatorContent` prop, which should be set to an icon element.

```js
import React from 'react';
import Tab from '@material/react-tab';
import MaterialIcon from '@material/react-material-icon';

class MyApp extends React.Component {
  state = {active: false};

  render() {
    return (
      <Tab
        active={this.state.active}
        indicatorContent={<MaterialIcon icon='favorite' />}
      >
        <span className='mdc-tab__text-label'>Love</span>
      </Tab>
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
active | boolean | If true will activate the tab and indicator.
className | string | Classes to appear on className attribute of root element.
isFadingIndicator | boolean | Enables a fading indicator, instead of sliding (default).
indicatorContent | element | Element that will appear within the `<TabIndicator />` element.
minWidth | boolean | If true will display the `<Tab />` as narrow as possible.
isMinWidthIndicator | boolean | If true will display the `<TabIndicator />` to the size of the longest content element.
isIconIndicator | boolean | If true will display the indicator content in the center of the tab.
previousIndicatorClientRect | ClientRect | The indicator's clientRect that was previously activated.
stacked | boolean | If true will display the tab icon and label to flow vertically instead of horizontally.
onTransitionEnd | function | transitionend event callback handler.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab/README.md#sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
