# React Select Helper Text

MDC React Select Helper Text is a React Component which uses MDC [MDC Select Helper Text](https://github.com/material-components/material-components-web/tree/master/packages/mdc-select/helper-text/)'s CSS and foundation JavaScript.

## Usage

```js
import {SelectHelperText} from '@material/react-select/helper-text/index';

const MyComponent = () => {
  return (
    <SelectHelperText>
      Really fun helper text
    </SelectHelperText>
  );
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
persistent | boolean | Adds the `.mdc-select-helper-text--persistent` class to keep the helper text always visible.
