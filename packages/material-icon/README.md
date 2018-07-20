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


We recommend following either of the 2 ways of adding Material Icons to your app, which are both documented [here](https://google.github.io/material-design-icons/#icon-font-for-the-web). The 1st documented solution is the route our team has taken, since its not bundled with our CSS. This allows for quicker rendering, but a possibility of a Flash Of Unstyled Content (**FOUC**). Code is pasted here for your convenience.

```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
```

##### Preventing FOUC and Troubleshooting Ripple

There is a known issue if you turn on the ripple on the Material Icon component. If FOUC occurs, the ripple size will be calculated off of the text width/height. To get around this, give the component a predetermined width/height in your CSS (or inline styles). Original issue documented [here](https://github.com/material-components/material-components-web/issues/2702).

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
