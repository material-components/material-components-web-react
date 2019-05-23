# React Text Field Character Counter

MDC React Text Field Character Counter is a React Component which uses [MDC Text Field Character Counter](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield/character-counter)'s CSS and foundation JavaScript.

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
template | String | You can set custom template. See below

## Custom Template

CharacterCounter provides customizing by setting the `template` prop in CharacterCounter.  
If you contain `${count}` and `${maxLength}` in template, it will replace each value.  
(${count} is replaced length of Input's value, ${maxLength} is replaced Input's maxLength)  
For example, default template is `${count} / ${maxLength}`, so it appears `0 / 140`.  
If you set template as `${count} : ${maxLength}`, it appears `0 : 140`.  

### Sample

``` js
import React from 'react';
import TextField, {CharacterCounter, Input} from '@material/react-text-field';

class MyApp extends React.Component {
  render() {
    return (
      <TextField characterCounter={<CharacterCounter template='${count} : ${maxLength}' />}>
        <Input value={'Happy Coding!'} maxLength={140} />
      </TextField>
    );
  }
}
```

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield/character-counter#sass-mixins)
