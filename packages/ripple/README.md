# React Ripple

MDC React Ripple is a component for material icons.

## Installation

```
npm install @material/react-ripple
```


## Props

Prop Name | Type | Description
--- | --- | ---
unbounded | boolean | Ripple is unbounded if true.
disabled | n/a | Disables ripple if true.
style | object | Inline styles of root element.
className | string | Classes to appear on className attribute of root element.

## Usage

To wrap a component with the ripple HOC, please follow this example:

```js
import withRipple from '@material/react-ripple';

const Icon = (props) => {
  const {
    children,
    className = '',
    // call `initRipple` from the root element's ref. This attaches the ripple
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
