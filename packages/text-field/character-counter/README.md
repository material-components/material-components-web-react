# React Text Field Character Counter

MDC React Text Field Character Counter is a React Component which uses [MDC Text Field Character Counter](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield/character-counter)'s Sass and Foundational JavaScript logic.

## Usage

```js
import CharacterCounter from '@material/react-text-field/character-counter/index.js';

const MyComponent = () => {
  return (
    <CharacterCounter />
  );
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | CSS classes for element.
template | String | You can set custom template. [See below](#custom-template)

## Custom Template

CharacterCounter provides customization with the `template` prop in CharacterCounter.
The `template` prop accepts the `${count}` and `${maxLength}` arguments.  
The default template is `${count} / ${maxLength}`, so it appears `0 / 140`.  
If you set template as `${count} : ${maxLength}`, it appears as `0 : 140`.  

### Sample

``` js
import React from 'react';
import TextField, {CharacterCounter, Input} from '@material/react-text-field';

class MyApp extends React.Component {
  state = {value: 'Happy Coding!'};

  render() {
    return (
      <TextField characterCounter={<CharacterCounter template='${count} : ${maxLength}' />}>
        <Input
          maxLength={140}
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value})}
        />
      </TextField>
    );
  }
}
```

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield/character-counter#sass-mixins)
