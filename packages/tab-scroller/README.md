# React Tab Scroller

A React version of an [MDC Tab Scroller](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-scroller).

## Installation

```
npm install @material/react-tab-scroller
```

## Usage

### Styles

with Sass:
```js
import '@material/react-tab-scroller/index.scss';
```

with CSS:
```js
import '@material/react-tab-scroller/dist/tab-scroller.css';
```

### Javascript Instantiation

```js
import React from 'react';
import TabScroller from '@material/react-tab-scroller';

class MyApp extends React.Component {
  render() {
    return (
      <TabScroller>
        <div className='tab'>Tab 1</div>
        <div className='tab'>Tab 2</div>
        <div className='tab'>Tab 3</div>
      </TabScroller>
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
alignStart | boolean | If true aligns the initial scroll position to the first tab.
alignEnd | boolean | If true aligns the initial scroll position to the last tab.
alignCenter | boolean | If true aligns the initial scroll position to the middle tab.
className | string | Classes to appear on root element.
onWheel | function | Callback triggered on wheel event.
onTouchStart | function | Callback triggered on touchstart event.
onPointerDown | function | Callback triggered on pointerdown event.
onMouseDown | function | Callback triggered on mousedown event.
onKeyDown | function | Callback triggered on keydown event.
onTransitionEnd | function | Callback triggered on transitionend event.
