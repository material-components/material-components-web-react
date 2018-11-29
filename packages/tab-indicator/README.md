# React Tab Indicator

A React version of an [MDC Tab Indicator](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-indicator).

## Installation

```
npm install @material/react-tab-indicator
```

## Usage

### Styles

with Sass:
```js
import '@material/react-tab-indicator/index.scss';
```

with CSS:
```js
import '@material/react-tab-indicator/dist/tab-indicator.css';
```

### Javascript Instantiation

#### With an Underline (default)

```js
import React from 'react';
import TabIndicator from '@material/react-tab-indicator';

class MyApp extends React.Component {
  state = {active: false};

  render() {
    return (
      <div>
        <TabIndicator active={this.state.active} />
      </div>
    );
  }
}
```


#### With Icon

If you want the underline instead of an icon, pass the icon element as a child
of the Tab Indicator component.

```js
import React from 'react';
import TabIndicator from '@material/react-tab-indicator';
import MaterialIcon from '@material/react-material-icon';

class MyApp extends React.Component {
  state = {active: false};

  render() {
    return (
      <div>
        <TabIndicator
          active={this.state.active}
          icon
        >
          <MaterialIcon icon='star' />
        </TabIndicator>
      </div>
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
active | boolean | If true will activate the indicator.
className | string | Classes to appear on className attribute of root element.
fade | boolean | If enabled will use the fade animation for transitioning to other tabs.
icon | boolean | Indicates that the indicator is an icon instead of an underline.
previousIndicatorClientRect | ClientRect | The indicator's clientRect that was previously activated.
onTransitionEnd | function | transitionend event callback handler.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-indicator/README.md#sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
