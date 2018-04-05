# Top App Bar React

MDC React Top App Bar acts as a React container around MDC Top App Bar, and implements MDC Top App Bar's foundation layer. Please see [MDC Top App Bar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar).

## Installation

```
npm install @material/react-top-app-bar
```

## Usage

### JSX Structure

```html
<TopAppBar />
```

## Props

Prop Name | Type | Description
--- | --- | ---
actionItems | Array | Accepts an array of elements that should be rendered to the opposite side of the title. Note that a single action item should also be passed as an array.
className | String | Classes to be applied to the root element.
title | String | The title of the Top App Bar.
navigationIcon | Element | Appears adjacent to the title. This acts as the main action of the Top App Bar.
short | n/a | Enables short variant.
shortCollapsed | n/a | Enables short collapsed variant.
prominent | n/a | Enables prominent variant.

> NOTE: As per design guidelines, prominent variant should not be used with short or short collapsed.

### Navigation Icon

The navigation icon can be a `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc. If you decide to pass a non-native `React.Component`, you need to append the prop `className` to the className prop on the parent element. As an example please see the [MaterialIcon Component](../material-icon/index.js).

```js
import MyIcon from './myIcon';

<TopAppBar
  navigationIcon={<MyIcon icon='menu' />} />


  class MyIcon extends React.Component {
    render() {
      const {className} = this.props;

      // here MyIcon has `className` prop appended to the root's classes
      return <i className={`${className} my-icon-class`} />;
    }
  }
```

If you decide to just pass an element your markup should resemble this:

```js
  <TopAppBar
    navigationIcon={<i className='material-icons'>menu</i>} />
```

### Action Items

Similar to the [navigation icon](#navigation-icon), it can be `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc. If you decide to pass a non-native `React.Component`, you need to append the prop `className` to the className prop on the parent element. As an example please see the [MaterialIcon Component](../material-icon/index.js).

```js
import MyIcon from './myIcon';

<TopAppBar
  actionItems={[<MyIcon icon='bookmark' />]} />
```

If you decide to just pass an element your markup should resemble this:

```js
  <TopAppBar
    actionItems={[<i className='material-icons'>bookmark</i>]} />
```

> NOTE: `actionItems` prop is expecting an array of elements.

Please see [MDC Web Top App Bar Readme](https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar) for more information.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.34.1/packages/mdc-top-app-bar/README.md)
