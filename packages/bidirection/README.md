# Bidirection

MDC Bidirection is a group of methods to give bidirectional support to components.

## Installation

```
npm install @material/bidirection
```

## Usage

### Javascript Instantiation

```js
import React from 'react';
import {isElementRtl} from '@material/bidirection';

class MyApp extends React.Component {
  element = React.createRef();

  render() {
    return (
      <div dir='rtl'>
        <button ref={this.element}>
          {isElementRtl(this.element.current) ? 'Kcilc' : 'Click'}
        </button>
      </div>
    );
  }
}
```

## Methods

Method Name | Description
isElementRtl(element: Element) => Boolean | Returns true if a parent element of the `element` argument has the attribute `dir='rtl'`. Returns false if `element` is undefined/null.
