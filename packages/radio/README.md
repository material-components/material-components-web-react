# React Radio

A React version of an [MDC Radio](https://github.com/material-components/material-components-web/tree/master/packages/mdc-radio).

## Installation

```
npm install @material/react-radio
```

## Usage

### Styles

with Sass:
```js
import '@material/react-radio/index.scss';
```

with CSS:
```js
import '@material/react-radio/dist/radio.css';
```

### Javascript Instantiation

```js
import React from 'react';
import Radio, {NativeRadioControl} from '@material/react-radio';

class MyApp extends React.Component {
  state = {petValue: null};

  render() {    
    return (
      <div>
        <Radio label='Dog' key='dog'>
          <NativeRadioControl
            name='pets'
            value='dog'
            id='dog'
            onChange={(e) => this.setState({petValue: e.target.value})}
          />
        </Radio>
        <Radio label='Cat' key='cat'>
          <NativeRadioControl
            name='pets'
            value='cat'
            id='cat'
            onChange={(e) => this.setState({petValue: e.target.value})}
          />
        </Radio>
    </div>
    );
  }
}
```

> NOTE: The `.mdc-radio` element and the associated label are wrapped around an `.mdc-form-field` element for styling.

## Radio Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the `.mdc-radio` element.
wrapperClasses | String | Classes to be applied to the `.mdc-form-field` wrapper element.
label | String | Label associated with radio input control.

# NativeRadioControl Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the `.mdc-radio` element.
checked | Boolean | Default `false`. When true will switch radio to the checked state.
value | String | The associated value with the radio element.
disabled | Boolean | Default `false`. When true will disable the radio element.

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-radio/README.md#sass-mixins)
