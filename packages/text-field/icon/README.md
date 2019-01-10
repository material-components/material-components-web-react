# React Text Field Icon

MDC React Text Field Icon is a React Component which uses MDC [MDC Text Field Icon](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield/icon/)'s CSS and foundation JavaScript.

## Usage

```js
import Icon from '@material/react-text-field/icon/index.js';

const MyComponent = () => {
  return (
    <Icon>
      <i className='material-icons' />
    </Icon>
  );
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
disabled | Boolean | Toggles the disabled state of the icon.
children | Element | Required. Expects a single child icon element.
onSelect | Function() => void | Optional callback for user interaction with icon
> Notes: `onSelect`  fired on click event and "Enter key" keydown event.
> `onSelect` will add tabindex of 0 if tabindex is not previously added to icon

## Icon

The icon can be a `<a>`, `<i>`, `<svg>`, `<image>`, `<span>`, etc.

If you decide to use a React Component please see [Integrating with Components](./../../../docs/guidelines.md#integrating-with-components). It must accept the `classNames` prop so the Text Field Icon Component can add the appropriate classes.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/icon/README.md#sass-mixins)
