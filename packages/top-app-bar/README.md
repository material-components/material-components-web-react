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
navIcon | Element | Appears adjacent to the title. This acts as the main action of the Top App Bar.
short | n/a | Enables short variant.
shortCollapsed | n/a | Enables short collapsed variant.
prominent | n/a | Enables prominent variant.

> NOTE: As per design guidelines, prominent variant should not be used with short or always collapsed.

### Navigation Icon

The navigation icon can be a `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc. If you decide to pass a `React.Component`, you should wrap it in the [HOC](https://reactjs.org/docs/higher-order-components.html) `asNavIcon` found [here](./asNavIcon). Your `React.Component` should consume the prop `className` and pass it to the root element as shown in [MaterialIcon](../material-icon/index.js).

```js
import MaterialIcon from '../../../packages/material-icon';
import asNavIcon from '../../../packages/top-app-bar/asNavIcon';

const NavIcon = asNavIcon(MaterialIcon);

<TopAppBar
  navIcon={<NavIcon icon='menu' />} />
```

If you decide to just pass an element your markup should resemble this:

```js
  <TopAppBar
    navIcon={<i className='material-icons'>menu</i>} />
```

### Action Items

Similar to the [navigation icon](#navigation-icon), it can be `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc. But if you decide to pass it a `React.Component`, you should wrap it in the [HOC](https://reactjs.org/docs/higher-order-components.html) `asActionItem` found [here](./asActionItem). Your `React.Component` should consume the prop `className` and pass it to the root element as shown in [MaterialIcon](../material-icon/index.js).


```js
import MaterialIcon from '../../../packages/material-icon';
import asActionItem from '../../../packages/top-app-bar/asActionItem';

const ActionItem = asActionItem(MaterialIcon);

<TopAppBar
  actionItems={[<ActionItem icon='bookmark' />]} />
```


If you decide to just pass an element your markup should resemble this:

```js
  <TopAppBar
    actionItems={[<i className='material-icons'>bookmark</i>]} />
```

> NOTE: `actionItems` prop is expecting an array of elements.

Please see [MDC Web Top App Bar Readme](https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar) for more information.
