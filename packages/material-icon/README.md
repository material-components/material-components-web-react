# React Material Icon

A React wrapper for [Material Icons](http://material.io/tools/icons).

## Installation

```
npm install @material/react-material-icon
```

## Usage

### Styles

with Sass:
```js
import '@material/react-material-icon/index.scss';
```

with CSS:
```js
import '@material/react-material-icon/dist/material-icon.css';
```

#### Importing Icons

The React material icon package does not come packaged with [Google Font's Material Icons](https://google.github.io/material-design-icons/). If it was included in the Sass package this would block rendering of the page until the icons download.
We recommend following the two methods of adding the Material Icons to your app documented [here](https://google.github.io/material-design-icons/#getting-icons). We have personally taken the `<link>` tag approach as it doesn't block page render. Code is pasted here for your convenience.

```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
```

### Javascript Instantiation

```js
import MaterialIcon from '@material/react-material-icon';

const MyComponent = () => {
  return (
    <MaterialIcon icon='menu' />
  );
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
icon | string | Type of icon to be displayed.
className | string | Classes to pass on to the root `<i>` element.
hasRipple | n/a | If present on element, it will enable the ripple on the icon.
