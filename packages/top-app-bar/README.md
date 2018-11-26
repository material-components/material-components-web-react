# React Top App Bar

A React version of an [MDC Top App Bar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar).

## Installation

```
npm install @material/react-top-app-bar
```

## Usage

### Styles

with Sass:
```js
import '@material/react-top-app-bar/index.scss';
import '@material/react-material-icon/index.scss';
```

with CSS:
```js
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
```

### Javascript Instantiation
```js
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

const MyComponent = () => {
  return (
    <div>
      <TopAppBar
        title='Miami, FL'
        navigationIcon={<MaterialIcon
          icon='menu'
          onClick={() => console.log('click')}
        />}
        actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
      />
      <TopAppBarFixedAdjust>
        My exciting content!
      </TopAppBarFixedAdjust>
    </div>
  );
}
```

Use the `<TopAppBarFixedAdjust />` component to give your content top-padding, so it isn't hidden on page render.

## Props

Prop Name | Type | Description
--- | --- | ---
actionItems | Array | Accepts an array of elements that should be rendered to the opposite side of the title. Note that a single action item should also be passed as an array.
className | String | Classes to be applied to the root element.
title | String | The title of the Top App Bar.
navigationIcon | Element | Appears adjacent to the title. This acts as the main action of the Top App Bar.
short | Boolean | Enables short variant.
shortCollapsed | Boolean | Enables short collapsed variant.
prominent | Boolean | Enables prominent variant.
fixed | Boolean | Enables fixed variant.

> NOTE: As per design guidelines, prominent variant should not be used with short or short collapsed.


## Icons

Use of [Material Icon's](../material-icon/README.md) for Action Items and Navigation Icons are recommended, since the Ripple is included with the Component. Using custom Components will require you to wrap the Component with the [`withRipple HOC`](../ripple/README.md). If you do decide to build your own custom Component, it is recommended to use the `hasRipple` prop to toggle between icons with and without ripple. See the [Material Icon's implementation](../material-icon/index.js) to see how to implement the `hasRipple` prop within your custom Component.

### Navigation Icon

The navigation icon can be a `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc., but again must be wrapped with the `withRipple HOC`.

```js
  <TopAppBar
    navigationIcon={<i className='material-icons'>menu</i>} />
```

If you decide to use a React Component please see [Integrating with Components](./../../docs/guidelines.md#integrating-with-components).

### Action Items

Similar to the [navigation icon](#navigation-icon), it can be `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc., and must be wrapped with the `withRipple HOC`.

```js
  <TopAppBar
    actionItems={[<i className='material-icons'>bookmark</i>]} />
```

If you decide to use a React Component please see [Integrating with Components](./../../docs/guidelines.md#integrating-with-components).

> NOTE: `actionItems` prop is expecting an array of elements.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-top-app-bar/README.md#sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.

## Usage with Drawer

Please see the docs in drawer to [integrate with Top app bar](../packages/drawer/README.md#usage-with-top-app-bar)
