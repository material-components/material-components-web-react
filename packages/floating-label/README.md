# React Floating Label

MDC React Floating Label is as a React container around MDC Floating Label. Please see [MDC Fab](https://github.com/material-components/material-components-web/tree/master/packages/mdc-floating-label).

## Installation

```
npm install @material/react-floating-label
```

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
handleWidthChange | Function | Callback method to pass the width to a parent Component.
float | Boolean | Floats label depending on value passed.

## Usage

### Positioning

React Floating Label is meant to be used with other Components, specifically input type elements. Floating label is positioned absolute, which requires the parent element to be position _relative_.

### Shake Label

To shake the label you'll need to add a _ref_ to the `<FloatingLabel />` element. Using the ref, you can then call `shake()` to start the shake animation. Ex:

```js

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // createRef was introduce in React v16.3
    // https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
    this.floatingLabelElement = React.createRef();
  }

  render() {
    return (
      <FloatingLabel ref={this.floatingLabelElement}/>
        My Label
      </FloatingLabel>
    );
  }

  // ... later in code ...

  this.floatingLabelElement.current.shake();
}
```

### Label Width

Label width is set during mount, and is calculated from the `offsetWidth` property. The Component will call `setWidth()` when mounted. `setWidth()` will execute with a new width value if `this.props.children` changes.

```js
<FloatingLabel
  handleWidthChange={(width) => this.setState({width})}
>
  My Label
</FloatingLabel>
```


## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.34.1/packages/mdc-fab/README.md#advanced-sass-mixins)
