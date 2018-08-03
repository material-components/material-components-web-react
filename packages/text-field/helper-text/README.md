# React Text Field Helper Text

MDC React Text Field Helper Text is a React Component which uses MDC [MDC Text Field Helper Text](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield/helper-text/)'s CSS and foundation JavaScript.

## Usage

```js
import HelperText from '@material/react-text-field/helper-text/index.js';

const MyComponent = () => {
  return (
    <HelperText>
      Really fun helper text
    </HelperText>
  );
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
aria-hidden | Boolean | Toggles aria-hidden functionality.
children | String or Element | Required. Text to be displayed as helper text.
className | String | CSS classes for element.
isValid | Boolean | When toggled will style the helper text component.
isValidationMessage | Boolean | If true, the helper text is treated as a validation message.
persistent | Boolean | If true, always shows the helper text.
role | String | Sets role on HTML element.
showToScreenReader | Boolean | toggles the aria-hidden property to allow element to be visible to the screen reader.
validation | Boolean | If true, alters the helper text to an error message.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/helper-text/README.md#sass-mixins)
