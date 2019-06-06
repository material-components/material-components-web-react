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
import TopAppBar, {
  TopAppBarFixedAdjust, 
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

const MyComponent = () => {
  return (
    <div>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection align='start'>
            <TopAppBarIcon navIcon tabIndex={0}>
              <MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')}/>
            </TopAppBarIcon>
            <TopAppBarTitle>Miami, FL</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection align='end' role='toolbar'>
            <TopAppBarIcon actionItem tabIndex={0}>
              <MaterialIcon 
                aria-label="print page" 
                hasRipple 
                icon='print' 
                onClick={() => console.log('print')}
              />
            </TopAppBarIcon>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust>
        My exciting content!
      </TopAppBarFixedAdjust>
    </div>
  );
}
```

Use the `<TopAppBarFixedAdjust />` component to give your content top-padding, so it isn't hidden on page render.

## Props

### TopAppBar

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
short | Boolean | Enables short variant.
shortCollapsed | Boolean | Enables short collapsed variant.
prominent | Boolean | Enables prominent variant.
fixed | Boolean | Enables fixed variant.
dense | Boolean | Enables dense variant. 
scrollTarget | React.RefObject | Sets scroll target to different DOM node (default is `window`)
tag | String | Customizes the `TopAppBar` HTML tag.  (default: `<header>`)
> NOTES: As per design guidelines, prominent and dense variants should not be used with short or short collapsed. Additionally, dense variants should only be used on desktop. Additionally short top-app-bars should be used with no more than 1 action item.

### TopAppBarRow
Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
tag | String | Customizes the `TopAppBarRow` tag. (default: `<div>`)

### TopAppBarSection
Prop Name | Type | Description
--- | --- | ---
align | Sring ('start' or 'end') | optional property that aligns section content to either start or end of section
className | String | Classes to be applied to the root element.
tag | String | Customizes the `TopAppBarSection` tag. (default: `<section>`)
> Note: if section contains action items it is recommended to add property role='toolbar' for a11y purposes

### TopAppBarTitle
Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
tag | String | Customizes the `TopAppBarTitle` tag. (default: `<span>`)

### TopAppBarIcon
Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
actionItem | Boolean | applies action-item class to icon
navIcon | Boolean | applies nav-icon class to icon
children | React.ReactElement<any> | can be any icon. Material Icons are recommended
> Notes: (1) consider adding `aria-label` to actionItem's. (2) you may need to manually add ripple or tabindex to icon. (3) Short top-app-bars should be used with no more than 1 action item.

### TopAppBarFixedAdjust

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
dense | Boolean | Enables dense variant. 
prominent | Boolean | Enables prominent variant.
short | Boolean | Enables short variant.
tag | String | Customizes the TopAppBarFixedAdjust tag (defaults to `<main>`)

> NOTE: if not dense, prominent, or short will apply `mdc-top-app-bar--fixed-adjust`

## Icons

Use of [Material Icon's](../material-icon/README.md) for Action Items and Navigation Icons are recommended, since the Ripple is included with the Component. Using custom Components will require you to wrap the Component with the [`withRipple HOC`](../ripple/README.md). If you do decide to build your own custom Component, it is recommended to use the `hasRipple` prop to toggle between icons with and without ripple. See the [Material Icon's implementation](../material-icon/index.js) to see how to implement the `hasRipple` prop within your custom Component.

### Navigation Icon

The navigation icon can be a `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc., but again must be wrapped with the `withRipple HOC`.

```js
  <TopAppBarIcon navIcon>
    <i className='material-icons'>menu</i>
  </TopAppBarIcon>
```

If you decide to use a React Component please see [Integrating with Components](./../../docs/guidelines.md#integrating-with-components).

### Action Items

Similar to the [navigation icon](#navigation-icon), it can be `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc., and must be wrapped with the `withRipple HOC`.

```js
  <TopAppBarIcon actionItem>
    <i className='material-icons'>bookmark</i>
  </TopAppBarIcon>
```

If you decide to use a React Component please see [Integrating with Components](./../../docs/guidelines.md#integrating-with-components).


## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-top-app-bar/README.md#sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.

## Usage with Drawer

Please see the docs in drawer to [integrate with Top app bar](../drawer#usage-with-top-app-bar)
