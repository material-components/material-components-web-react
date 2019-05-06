# React Menu Surface

A React version of an [MDC Menu Surface](https://github.com/material-components/material-components-web/tree/master/packages/mdc-menu-surface).

## Installation

```
npm install @material/react-menu-surface
```

## Usage

### Styles

with Sass:
```js
import '@material/react-menu-surface/index.scss';
```

with CSS:
```js
import '@material/react-menu-surface/dist/menu-surface.css';
```

### Javascript Instantiation

#### Anchored to Element

React Menu Surface accepts one child element. Please see the below example if you need to anchor the menu surface to a specific element. In this case, we wrapper `<button>` and `<MenuSurface>` element within the anchor, and give the `mdc-menu-surface--anchor` class to the element. You can specify a corner for the menu surface to appear from, otherwise it defaults to top-left. For a list of different anchor corner values, please see the [MDC Web Menu Surface constants.ts file](https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/constants.ts#L75).

> NOTE: `<MenuSurface>` also has an `onClose` callback method prop, which is called when the menu closes. Use this as an opportunity to update your application's state.

```js
import React from 'react';
import MenuSurface, {Corner} from '@material/react-menu-surface';
import Button from '@material/react-button';

class MyApp extends React.Component {
  state = {
    open: false,
    anchorElement: null,
  };

  setAnchorElement = (element) => {
    if (this.state.anchorElement) {
      return;
    }
    this.setState({anchorElement: element});
  }

  render() {
    return (
      <div
        className='mdc-menu-surface--anchor'
        ref={this.setAnchorElement}
      >
        <Button raised onClick={() => this.setState({open: true})}>Open Menu</Button>

        <MenuSurface
          open={this.state.open}
          anchorCorner={Corner.BOTTOM_LEFT}
          onClose={() => this.setState({open: false})}
          anchorElement={this.state.anchorElement}
        >
          <img
            style={{maxWidth: '20vw', maxHeight: '20vh'}}
            src='http://images.my.photo.url' />
        </MenuSurface>
      </div>
    );
  }
}
```
#### Anchored to Coordinates (right-click)

You may want to anchor your menu surface to x, y coordinates. One example being a right-click contextmenu. Instead of passing an `anchorElement` you need to pass `coordinates`.


```js
import React from 'react';
import MenuSurface from '@material/react-menu-surface';

class MyApp extends React.Component {
  state = {
    open: false,
    coordinates: null,
  };

  componentDidMount() {
    this.rightClickCallback_ = (evt) => {
      this.setState({
        open: true,
        coordinates: {x: evt.clientX, y: evt.clientY},
      });
      evt.preventDefault();
    };

    window.addEventListener('contextmenu', this.rightClickCallback_);
  }

  componentWillUnmount() {
    window.removeEventListener('contextmenu', this.rightClickCallback_);
  }

  render() {
    return (
      <div className='my-app'>
        <h1>Menu Surface</h1>

        <MenuSurface
          open={this.state.open}
          onClose={() => this.setState({open: false, coordinates: null})}
          coordinates={this.state.coordinates}
        >
          <img
            style={{maxWidth: '20vw', maxHeight: '20vh'}}
            src='http://images.my.photo.url' />
        </MenuSurface>
      </div>
    );
  }
}
```

> NOTE: The React menu surface component is always hoisted to the body. This is one place the component differs from MDC Web's version, which gives the option of hoisting/not hoisting. Always hoisting the menu surface to the body allows fixes a few issues, and simplifies the component API.

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
anchorCorner | Corner | Sets the corner that the menu surface will be anchored to. See [MDC Web constants.js](https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/constants.js#L74).
anchorElement | Element | Sets the anchor element used as an anchor for `menu-surface` positioning logic. Should contain class `.mdc-menu-surface--anchor`.
anchorMargin | Object* | Sets the distance from the anchor point that the menu surface should be shown.
coordinates | {x: Number, y: Number} | Sets the anchor coordinates when menu surface does not use anchorElement.
open | Boolean | Changing value will trigger open/close of the menu surface.
quickOpen | Boolean | Disables the open/close animation of the menu surface, which makes the open/close instant.
fixed | Boolean | Sets the menu surface to fixed positioning.
onClose | Function | Callback triggered after menu surface closes.

> * | AnchorMargin takes the form of {top: Number, bottom: Number , left: Number , right : Number}

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu-surface/README.md#advanced-sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
