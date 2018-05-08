# React Text Field

MDC React Text Field is a React Component which uses MDC [MDC Text Field](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield/)'s CSS and foundation JavaScript.

## Props

Prop Name | Type | Description
--- | --- | ---
box | Boolean | Enables box variant.
children | Element | Mandatory. The input element of the text field.
className | String | An optional class added to the `.mdc-text-field` element.
dense | Boolean | Enables dense variant.
floatingLabelClassName | String | An optional class added to the floating label element fo the text field.
fullWidth | Boolean | Enables fullWidth variant.
helperText | String | Helper text that appears below the text field.
helperTextAriaHidden | Boolean | Sets the helper text element's aria-hidden value.
helperTextClassName | String | An optional class added to the helper text element.
helperTextIsValidation | Boolean | Treats the helper text as a validation message.
helperTextPersistent | Boolean | Enables the helper text to always appear.
helperTextRole | String | Sets the aria role value of the helper text element.
label | String | Mandatory. Label text that appears as the floating label or placeholder.
leadingIcon | Element | An icon element that appears as the leading icon.
lineRippleClassName | String | An optional class added to the line ripple element.
notchedOutlineClassName | String | An optional class added to the notched outline element.
outlined | Boolean | Enables outlined variant.
textarea | Boolean | Enables textarea variant.
trailingIcon | Element | An icon element that appears as the trailing icon.

## Usage

React Text Field accepts one child element which is the input element. For ease of integration, we have provided an input component to be used with React Text Field.

```js
import React from 'react';
import TextField, {Input} from '@material/react-text-field';

class MyApp extends React.Component {
  state = {value: 'Woof'};

  render() {
    return (
      <div>
        <TextField label='Dog'>
          <Input
            value={this.state.value}
            onChange={(e) => this.setState({value: e.target.value})}/>
        </TextField>
      </div>
    );
  }
}
```

> NOTE: In order to get access to the value, you must add an onChange handler, which accepts an event and updates the value of the input as shown above.


### Input Props

Prop Name | Type | Description
--- | --- | ---



## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.35.0/packages/mdc-textfield/README.md)
