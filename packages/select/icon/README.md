# React Select Icon

MDC React Select Icon is a React Component which uses MDC [MDC Select Icon](https://github.com/material-components/material-components-web/tree/master/packages/mdc-select/icon/)'s CSS and foundation JavaScript.

## Usage

```js
import {SelectIcon} from '@material/react-select/icon/index';

const MyComponent = () => {
  return (
    <SelectIcon className='material-icons'>
      favorite
    </SelectIcon>
  );
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
tag | string (keyof React.ReactHTML) | Sets the element tag. Defaults to i which becomes`<i />`.
