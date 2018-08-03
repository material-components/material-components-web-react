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

```js
import React from 'react';
import TabIndicator from '@material/react-tab-indicator';

class MyApp extends React.Component {
  state = {active: false};

  render() {
    return (
      <div>
        <TabIndicator
          active={this.state.active}
          icon={icon}
        >
      </div>
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
unbounded | boolean | Ripple is unbounded if true.
disabled | n/a | Disables ripple if true.
style | object | Inline styles of root element.
className | string | Classes to appear on className attribute of root element.


## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-indicator/README.md#sass-mixins)
