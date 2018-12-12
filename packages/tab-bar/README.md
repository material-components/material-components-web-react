# React Tab Bar

A React version of an [MDC Tab Bar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-bar).

## Installation

```
npm install @material/react-tab-bar
```

## Usage

### Styles

with Sass:
```scss
import '@material/react-tab-bar/index.scss';
import '@material/react-tab-scroller/index.scss';
import '@material/react-tab/index.scss';
import '@material/react-tab-indicator/index.scss';
```

with CSS:
```css
import '@material/react-tab-bar/dist/tab-bar.css';
import '@material/react-tab-scroller/dist/tab-scroller.css';
import '@material/react-tab/dist/tab.css';
import '@material/react-tab-indicator/dist/tab-indicator.css';
```

### Javascript Instantiation

```js
import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';

class MyApp extends React.Component {
  state = {activeIndex: 0};

  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});

  render() {
    return (
      <div>
        <TabBar
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={this.handleActiveIndexUpdate}
        >
          <Tab>
            <span className='mdc-tab__text-label'>One</span>
          </Tab>
          ...
        </TabBar>
      </div>
    );
  }
}
```

> _NOTE_: You can also use a custom tab component with the `TabBar`, but it must implement the methods `activate`, `deactivate`, `focus`, `computeIndicatorClientRect`, and `computeDimensions`. See [`MDCTab` documentation](https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab/README.md#mdctab-properties-and-methods) for more details.

## Props

Prop Name | Type | Description
--- | --- | ---
activeIndex | number | Index of the active tab.
indexInView | number | Index of the tab to be scrolled into view.
handleActiveIndexUpdate | Function(activeIndex: number) => void | Callback after the active index is updated.
className | string | Classes to appear on className attribute of root element.
isRtl | Boolean |  Whether the direction of the tab bar is RTL.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-bar/README.md#sass-mixins)
