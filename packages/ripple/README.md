# React Ripple

A React version of an [MDC Ripple](https://github.com/material-components/material-components-web/tree/master/packages/mdc-ripple).

## Installation

```
npm install @material/react-ripple
```

## Usage

### Styles

with Sass:
```js
import '@material/react-ripple/index.scss';
```

You'll also need to include these sass mixins on the element. Please also refer to [Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-ripple/README.md#sass-apis) to customize further.

```sass
@import "@material/ripple/mdc-ripple.scss";

// refer to element in Javascript portion below
.ripple-icon-component {
  @include mdc-ripple-surface;
  @include mdc-ripple-radius-bounded;
  @include mdc-states;
  overflow: hidden;
}
```

with CSS:
```js
import '@material/react-ripple/dist/ripple.css';
```

### Javascript Instantiation

To wrap a component with the ripple HOC, please follow this example:

```js
import {withRipple} from '@material/react-ripple';

const Icon = (props) => {
  const {
    children,
    className = '',
    // You must call `initRipple` from the root element's ref. This attaches the ripple
    // to the element.
    initRipple,
    // include `unbounded` to remove warnings when passing `otherProps` to the
    // root element.
    unbounded,
    ...otherProps
  } = props;

  // any classes needed on your component needs to be merged with
  // `className` passed from `props`.
  const classes = `ripple-icon-component ${className}`;

  return (
    <div
      className={classes}
      ref={initRipple}
      {...otherProps}>
      {children}
    </div>
  );
};

const RippleIcon = withRipple(Icon);
```

Wrap your Icon component with the HOC `withRipple`, which returns a component
with a ripple capable surface.

### Typescript

If you're using TS, you will need to extend from the provided InjectedProps.

```js

import {withRipple, InjectedProps} from '@material/react-ripple';

interface IconProps extends InjectedProps<HTMLDivElement> {
  children?: React.ReactNode;
  className: string;
  initRipple: React.Ref<HTMLDivElement>;
  unbounded: boolean;
}

const Icon = (props) => {
  const {
    children,
    className = '',
    // You must call `initRipple` from the root element's ref. This attaches the ripple
    // to the element.
    initRipple,
    // include `unbounded` to remove warnings when passing `otherProps` to the
    // root element.
    unbounded,
    ...otherProps
  } = props;

  // any classes needed on your component needs to be merged with
  // `className` passed from `props`.
  const classes = `ripple-icon-component ${className}`;

  return (
    <div
      className={classes}
      ref={initRipple}
      {...otherProps}>
      {children}
    </div>
  );
};

const RippleIcon = withRipple<IconProps, HTMLDivElement>(Icon);
```

## Advanced Usage

### Ripple surface and ripple activator

You may want to apply the visual treatment (CSS classes and styles) for a ripple surface on one element, but have its activation rely on a different element. For example, putting a ripple on a `<div>` which will be activated by focusing on a child `<input>` element. We call the visual element the "ripple surface" and the activating element the "ripple activator".

The `initRipple` callback prop can take in an extra `activator` argument for the case where the ripple activator differs from the ripple surface. If the `activator` argument is not provided, the ripple surface will also serve as the ripple activator.

```js
import {withRipple} from '@material/react-ripple';

const MyInput = (props) => {
  const {
    rippleActivator,
    ...otherProps
  } = props;

  return (
    <input ref={rippleActivator} {...otherProps} />
  );
}

class MyComponent extends React.Component {
  rippleActivator = React.createRef();

  init = (el) => {
    this.props.initRipple(el /* surface */, this.rippleActivator.current /* activator */);
  }

  render() {
    const {
      className,
      initRipple,
      unbounded,
      ...otherProps
    } = this.props;

    return (
      <div
        className={`my-component ${className}`}
        ref={this.init}
        {...otherProps}>
        <MyInput rippleActivator={this.rippleActivator} />
      </div>
    );
  }
};

const MyRippledComponent = withRipple(MyComponent);
```

## Props

Prop Name | Type | Description
--- | --- | ---
unbounded | boolean | Ripple is unbounded if true.
disabled | n/a | Disables ripple if true.
style | object | Inline styles of root element.
className | string | Classes to appear on className attribute of root element.


## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-ripple/README.md#sass-apis)
