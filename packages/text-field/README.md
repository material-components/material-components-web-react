# React Text Field

MDC React Text Field is component for MDC Text Field. Please see [MDC Text Field](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield/).

## Installation

```
npm install @material/react-text-field
```

## Usage

### Styles

with Sass:
```js
import '@material/react-text-field/index.scss';
```

with CSS:
```js
import '@material/react-text-field/dist/text-field.css';
```

### Javascript Instantiation

React Text Field accepts one child element which is the input element. For ease of integration, we have provided an input component to be used with React Text Field.

```js
import React from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';

class MyApp extends React.Component {
  state = {value: 'Woof'};

  render() {
    return (
      <div>
        <TextField
          label='Dog'
          helperText={<HelperText>Help Me!</HelperText>}
          onTrailingIconSelect={() => this.setState({value: ''})}
          trailingIcon={<MaterialIcon role="button" icon="delete"/>}
        ><Input
           value={this.state.value}
           onChange={(e) => this.setState({value: e.currentTarget.value})} />
        </TextField>
      </div>
    );
  }
}
```

> NOTE: In order to get access to the value, you must add an onChange handler, which accepts an event and updates the value of the input as shown above.
## Props

Prop Name | Type | Description
--- | --- | ---
children | Element | Mandatory. The input element of the text field.
className | String | An optional class added to the `.mdc-text-field` element.
dense | Boolean | Enables dense variant.
floatingLabelClassName | String | An optional class added to the floating label element of the text field.
fullWidth | Boolean | Enables fullWidth variant.
helperText | Element | Helper text that appears below the text field. Use the `<HelperText>` component that comes with this package.
label | String | An optional label text that appears as the floating label or placeholder.
leadingIcon | Element | An icon element that appears as the leading icon.
lineRippleClassName | String | An optional class added to the line ripple element.
notchedOutlineClassName | String | An optional class added to the notched outline element.
onLeadingIconSelect | Function | Optional callback fired on interaction with `leadingIcon`.
onTrailingIconSelect | Function | Optional callback fired on interaction with `trailingIcon`.
outlined | Boolean | Enables outlined variant.
textarea | Boolean | Enables textarea variant.
trailingIcon | Element | An icon element that appears as the trailing icon.

### Input Props

Not all the props below are used for majority of cases. Properties like `foundation` shouldn't be used when implementing the text field, but is used internally in React Text Field.

Prop Name | Type | Description
--- | --- | ---
inputType | string | HTML tag to be used to render input element. 'input' (default) or 'textarea'.
className | String | Classes to be applied to the input element.
disabled | Function | Disables the input and the parent text field.
foundation | Function | The text field foundation.
isValid | Boolean | If set, this value will override the native input's validation.
id | String | The `<input>` id attribute.
onBlur | Function | Blur event handler.
onChange | Function | Change event handler.
onFocus | Function | Focus event handler.
onMouseDown | Function | Mouse down event handler.
onTouchStart | Function | Touch start event handler.
setDisabled | Function | Callback function that is called when the `disabled` prop updates.
setInputId | Function | Callback function that is called when the `id` attribute updates.
handleFocusChange | Function | Callback function that is called when `focus` or `blur` events occur
value | Number/String | Value of the input.
ref | Function(input: ReactElement) => void | On mount of component, will call passed function with the instance of the `<Input />`.

>NOTE: the `<Input>` component will receive all properties that a standard `<input>` accepts.

### Accessing the Native Input element

There will be times when you need to access the native <input />. For example if you need to focus the text field, you can add a ref callback method to the `<Input />` element and access the `<input />`. The `ref` will accept a callback method and on mount and will pass the instance of the input component. Here is an example of how to programatically focus the `<input />`:

```js
import React from 'react';
import TextField, {Input} from '@material/react-text-field';
import Button from '@material/react-button';

class MyApp extends React.Component {
  input = null;
  state = {value: 'Woof'};

  focusTextField = () => {
    if (!this.input) return;
    const inputElement = this.input.inputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.focusTextField}>Focus Text Field</Button>
        </div>
        <TextField label='Dog'>
          <Input
            value={this.state.value}
            ref={input => this.input = input}
            onChange={(e) => this.setState({value: e.currentTarget.value})}/>
        </TextField>
      </div>
    );
  }
}
```


### Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-textfield/README.md)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
