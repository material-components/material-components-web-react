# React Icon Button

A React version of an [MDC Icon Button](https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button).

## Installation

```
npm install @material/react-icon-button
```

## Usage

```js
import React from 'react';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

class MyApp extends React.Component {
  render() {
    return (
      <IconButton>
        <MaterialIcon icon='favorite' />
      </IconButton>
    );
  }
}
```

You can use any other icon here such as Font Awesome, which is documented more in detail [here](https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button#icon-button-toggle-with-font-awesome). If you're using [Google Font's Material Icons](https://material.io/tools/icons/?style=baseline), we recommend using our [Material Icon Component](../material-icon) as shown in the example above.

## Variants

### Icon Button Toggle

If you need to use this component as an Icon Button Toggle, please read [this documentation](https://github.com/material-components/material-components-web/blob/v0.37.1/packages/mdc-icon-button/README.md#icon-button-toggle). The following is an example using data attributes to toggle between on/off states:

```js
import React from 'react';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

class MyApp extends React.Component {
  render() {
    return (
      <IconButton
        className='mdc-icon-button material-icons'
        aria-label='Add to favorites'
        aria-pressed='false'
        data-demo-toggle
        data-toggle-on-content='favorite'
        data-toggle-on-label='Remove From Favorites'
        data-toggle-off-content='favorite_border'
        data-toggle-off-label='Add to Favorites'
      >
        <MaterialIcon icon='favorite_border' />
      </IconButton>      
    );
  }
}
```


## Props

Prop Name | Type | Description
--- | --- | ---
children | String | Icon element or text to be displayed within root element.
className | String | Classes to be applied to the root element.
disabled | Boolean | Disables button if true.
isLink | Boolean | Changes root element to an anchor tag (default button).
onClick | Function | Click event handler. Event is passed as an argument

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.37.1/packages/mdc-icon-button/README.md#sass-mixins)
