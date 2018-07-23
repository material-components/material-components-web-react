# React Select

MDC React Select is component for MDC Select. Please see [MDC Select](https://github.com/material-components/material-components-web/tree/master/packages/mdc-select/).

## Installation

```
npm install @material/react-select
```

## Usage

### Styles

with Sass:
```js
import '@material/react-select/index.scss';
```

with CSS:
```js
import '@material/react-select/dist/select.css';
```

### Javascript Instantiation

React Select requires at least one `<option>` element as a child and a label prop.

```js
import React from 'react';
import Select from '@material/react-select';

class MyApp extends React.Component {
  state = {value: 'pomsky'};

  render() {
    return (
      <Select
        label='Choose Dog'
        onChange={(evt) => this.setState({value: evt.target.value})}
      >
        <option value='pomsky'>Pomsky</option>
        <option value='goldenDoodle'>Golden Doodle</option>
      </Select>
    );
  }
}
```

> NOTE: In order to get access to the value, you must add an `onChange` handler, which accepts an event and updates the value of the input as shown above.

#### Shorthand options

If the option elements do not require anything unique, you can omit passing `this.props.children` and set the `option` attribute.

```js
import React from 'react';
import Select from '@material/react-select';

class MyApp extends React.Component {
  state = {value: 'pomsky'};

  render() {
    const options = [{
      label: 'Pomsky',
      value: 'pomsky',
    }, {
      label: 'Golden Doodle',
      value: 'goldenDoodle',
      disabled: true,
    }];

    return (
      <Select
        label='Choose Dog'
        onChange={(evt) => this.setState({value: evt.target.value})}
        options={options}
      />
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
box | Boolean | Enables box variant.
children | (Array<Element>|Element) | Array of `<option>` elements or a single `<option>` element.
className | String | An optional class added to the `.mdc-select` element.
disabled | Boolean | Disables the select.
floatingLabelClassName | String | An optional class added to the floating label element of the text field.
id | String | Id of the select element.
label | String | Mandatory. Label text that appears as the floating label.
lineRippleClassName | String | An optional class added to the line ripple element.
nativeControlClassName | String | An optional class added to the native `<select>` element.
notchedOutlineClassName | String | An optional class added to the notched outline element. Only applied if `props.outlined` is enabled.
outlined | Boolean | Enables outlined variant.
options | Array<String|Object> | Array of strings or objects to be used as options. To be used instead of `<option>` elements passed as `this.props.children`. If its an array of strings, then the string value will be used as the `label` and `value` of the `<option>` tag.

### Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins]([Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.37.1/packages/mdc-select/README.md#sass-mixins))
