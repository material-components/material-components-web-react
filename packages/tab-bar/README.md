# React Tab Bar

A React version of an [MDC Tab Bar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-bar).

## Installation

```
npm install @material/react-tab-bar
```

## Usage

### Styles

with Sass:
```js
import '@material/react-tab-bar/index.scss';
```

with CSS:
```js
import '@material/react-tab-bar/dist/tab-bar.css';
```

### Javascript Instantiation

```js
import React from 'react';
import TabBar from '@material/react-tab-bar';

class MyApp extends React.Component {
  state = {activeIndex: 0};

  render() {
    return (
      <div>
        <TabBar 
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={(activeIndex) => this.setState({activeIndex})}
        >
          <Tab>
            <span className='mdc-tab__text-label'>One</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Two</span>
          </Tab>
        </TabBar>
      </div>
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
activeIndex | number | Index of the active tab.
handleActiveIndexUpdate | Function(activeIndex: number) => void | Callback for when the active index is updated
className | string | Classes to appear on className attribute of root element.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab-bar/README.md#sass-mixins)
