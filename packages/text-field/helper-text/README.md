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

## Input Validation

HelperText provides validity styling by setting the `validation` prop in HelperText.

### Native Validation

Validation can be checked through the appropriate `Input` validation properties (pattern, min, max, required, step, minLength, maxLength).

The following snippet is an example of how to use pattern regex and check for minimum length with HelperText:
``` js
import TextField, {HelperText, Input} from '@material/react-text-field';
import React from 'react';

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};
  }
  render() {
    return (
      <div>
        <TextField
          box
          label='Username'
          helperText={
            <HelperText validation>Invalid username</HelperText>
          }
        >
          <Input
            pattern='^([a-zA-Z_]+[0-9]*)$'
            minLength={8}
            name='username'
            value={this.state.username}
            onChange={(e)=>this.setState({username:e.target.value})}
          />
        </TextField>
      </div>
    );
  }
}
```

### Custom Validation

Validation could also be done manually by using the `isValid`, `isValidationMessage` and
`validation` props, alongside a custom validation method:

```js
import TextField, {HelperText, Input} from '@material/react-text-field';
import React from 'react';

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isValid: true, username: ''};
    this.onChange = this.onChange.bind(this);
    this.renderHelperText = this.renderHelperText.bind(this);
  }
  onChange(e) {
    const {value} = e.target;
    this.setState({isValid: value.includes('@'), username: value});
  }
  renderHelperText() {
    const { isValid } = this.state;
    if (isValid) {
      return (<HelperText>Please enter your Username</HelperText>);
    } else {
      return (
        <HelperText
          isValid={isValid}
          isValidationMessage
          validation
        >
          Your Username must contain an @
        </HelperText>
      );
    }
  }
  render() {
    return (
      <div>
        <TextField
          box
          label='Username'
          helperText={this.renderHelperText()}
        >
          <Input
            isValid={this.state.isValid}
            name='username'
            onChange={this.onChange}
            value={this.state.username}
          />
        </TextField>
      </div>
    );
  }
}
```

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/helper-text/README.md#sass-mixins)
