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
import '@material/react-tab-indicator/index.scss';
import '@material/react-tab/index.scss';
```

with CSS:
```css
import '@material/react-tab-indicator/dist/tab-indicator.css';
import '@material/react-tab/dist/tab.css';
```

### Javascript Instantiation

#### With an Underline (default)

```js
import React from 'react';
import Tab from '@material/react-tab';
import MaterialIcon from '@material/material-icon';

class MyApp extends React.Component {
  state = {active: false};

  render() {
    return (
      <Tab
        active={this.state.active}
         // this will be another tab's clientRect object
        previousIndicatorClientRect={previousTabClientRect}
      >
        <MaterialIcon className='mdc-tab__icon' icon='favorite' />
        <span className='mdc-tab__text-label'>Love</span>
      </Tab>
    );
  }
}
```

#### With Custom Indicator

Possibly you don't want to use the default underline indicator, but instead would like to use an icon. You'll need to add an `indicator` prop, which is a function that returns a `<TabIndicator />` element.

```js
import React from 'react';
import Tab from '@material/react-tab';
import MaterialIcon from '@material/material-icon';

class MyApp extends React.Component {
  state = {active: false};

  render() {
    return (
      <Tab
        active={this.state.active}
        previousIndicatorClientRect={previousTabClientRect}
        indicator={this.renderIndicator}
      >
        <span className='mdc-tab__text-label'>Love</span>
      </Tab>
    );
  }

  renderIndicator(props) {
    // must return a <TabIndicator /> element
    return (
      <TabIndicator
        icon
        {/*--
          You need to pass
          active, ref, and previousIndicatorClientRect props to the
          TabIndicator element
        --*/}
        active={props.active}
        ref={props.ref}
        previousIndicatorClientRect={props.previousIndicatorClientRect}
      >
        <MaterialIcon icon='favorite' />
      </TabIndicator>
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
indicator | function | Function that is passed props as an argument, that must return a `<TabIndicator />` element. The `<TabIndicator />` element must be passed `active`, `ref`, and `previousIndicatorClientRect` props. See example above.
minWidth | boolean | If true will display the `<Tab />` as narrow as possible.
isMinWidthIndicator | boolean | If true will display the `<TabIndicator />` to the size of the longest content element.
previousIndicatorClientRect | ClientRect | The indicator's clientRect that was previously activated.
onTransitionEnd | function | transitionend event callback handler.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-tab/README.md#sass-mixins)
