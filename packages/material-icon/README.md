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

There are two different ways to add Material Icons to your website, both of which are documented in [Material Icons Documentation](https://google.github.io/material-design-icons/#icon-font-for-the-web). We recommend "Method 1: via Google Web Fonts", because it renders faster, but there can be Flash Of Unstyled Content (**FOUC**). The code to load Material Icons via Google Web Fonts is pasted here for your convenience.
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
icon | String | Type of icon to be displayed.
className | String | Classes to pass on to the root element.
hasRipple | Boolean | If present on element, it will enable the ripple on the icon.
tag | String | Customizes the MaterialIcon HTML tag. (default: `<i>`) 


## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) for further reading.

## Usage with `tag='button'` 

If you set the `MaterialIcon` property tag to button you may find it desirable
to also adjust its appearance to make it appear less like a default HTMLButton. One 
way to accomplish this would be something like the following:

```js
import MaterialIcon from '@material/react-material-icon';
import './index.sccs';

const MyComponent = () => {
  return (
    <MaterialIcon icon='menu' tag='button' className='button-icon' />
  );
}
```

```css
 /* index.scss */
 .button-icon {
   background: transparents;
   border: none;
 }
```

> Note: a logical place to use the `tag='button'` property would be as a
> navigation icon or action item in the  [top-app-bar](../top-app-bar/README.md).
> Both  `.mdc-top-app-bar__action-item` and `.mdc-top-app-bar__navigation-icon` already
> apply `background: transparent; border: none;`
