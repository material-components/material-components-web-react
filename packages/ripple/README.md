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

with CSS:
```js
import '@material/react-ripple/dist/ripple.css';
```

### Javascript Instantiation

To wrap a component with the ripple HOC, please follow this example:

```js
import withRipple from '@material/react-ripple';

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

## Advanced Usage

### Ripple surface and ripple activator

You may want to apply the visual treatment (CSS classes and styles) of a ripple surface on one element, but have its activation rely on a different element. For example, this occurs when you want to put a ripple on a `<div>` which is activated by an inner `<input>`. We call the visual element the "ripple surface" and the activating element the "ripple activator".

The `initRipple` prop takes in an extra `activator` parameter in the case that the ripple activator differs from the ripple surface.

```js
import withRipple from '@material/react-ripple';

const MyInput = (props) => {
  const {
    setRippleActivator,
    ...otherProps
  } = props;

  return (
    <input ref={setRippleActivator} {...otherProps} />
  );
}

class MyComponent extends React.Component {
  rippleActivatorElement = null;

  init = (el) => {
    this.props.initRipple(el, this.rippleActivatorElement);
  }

  setRippleActivator = (el) => {
    this.rippleActivatorElement = el;
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
        <MyInput setRippleActivator={this.setRippleActivator} />
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
