# React Floating Action Button

A React version of an [MDC Floating Action Button](https://github.com/material-components/material-components-web/tree/master/packages/mdc-fab).

## Installation

```
npm install @material/react-fab
```

## Usage

### Styles

with Sass:
```js
import '@material/react-fab/index.scss';
```

with CSS:
```js
import '@material/react-fab/dist/fab.css';
```

### JSX Structure

The Fab can be used with the `span`, `i`, `img` or `svg` elements. It can also be used with the
[Material Icon](../material-icon) react component.
```html
<Fab icon={<span className="material-icons">favorite</span>}/>

<Fab icon={<i className="material-icons">favorite</i>}/>

<Fab icon={
  <svg xmlns="http://www.w3.org/2000/svg" className="material-icons" viewBox="0 0 24 24">
  ...
  </svg>
  }/>

<Fab icon={<img className="material-icons" src="/images/ic_button_24px.svg"/>}/>

<Fab icon={<MaterialIcon icon="favorite"/>}/>
```

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
exited | Boolean | When true animates the FAB out of view. When this false, the FAB will return to view.
mini | Boolean |  Enables the mini variant. 
icon | Element | The icon.
textLabel | String | The label, which makes the FAB extended.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-fab/README.md#advanced-sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
