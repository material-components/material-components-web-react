# React Snackbar

A React version of an [MDC Snackbar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-snackbar).

## Installation

```
npm install @material/react-snackbar
```

## Usage

### Styles

with Sass:
```js
import '@material/react-snackbar/index.scss';
```

with CSS:
```js
import '@material/react-snackbar/dist/snackbar.css';
```

### Javascript Instantiation
```js
import React from 'react';
import {Snackbar} from '@material/react-snackbar';

class MyApp extends React.Component {
  render() {
    return (
      <Snackbar message="Click Me!" actionText="dismiss" />
    );
  }
}
```

## Props

Prop Name | Type | Description
--- | --- | ---
message | String | Message to show in the snackbar
reason | String | Passed as argument when snackbar closes programatically
className | String | Classes to be applied to the root element.
timeoutMs | Number | Timeout in milliseconds when to close snackbar.
closeOnEscape | Boolean | Closes popup on "Esc" button if true.
actionText | String | Text for action button
leading | Boolean | Shows snackbar on the left if true (or right for rtl languages)
stacked | Boolean | Shows buttons under text if true
onAnnounce | Function() => void | Callback for handling screenreader announce event
onOpening | Function() => void | Callback for handling event, which happens before opening
onOpen | Function(evt: Event) => void | Callback for handling event, which happens after opening
onClosing | Function() => void | Callback for handling event, which happens before closing
onClose | Function() => void | Callback for handling event, which happens after closing

## Getting snackbar parameters

If you need to get the `timeoutMs`, `closeOnEscape`, or `open` value, then you can use a ref like so:

```js
import React from 'react';
import {Snackbar} from '@material/react-snackbar';
 class MyApp extends React.Component {
  getSnackbarInfo = (snackbar) => {
    if (!snackbar) return;
    console.log(snackbar.getTimeoutMs());
    console.log(snackbar.isOpen());
    console.log(snackbar.getCloseOnEscape());
  }
  render() {
    return (
      <Snackbar
        message="Click Me!"
        actionText="dismiss"
        ref={this.getSnackbarInfo}
      />
    );
  }
}
```

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-snackbar/README.md#sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
