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
onShakeEnd | Function | Callback method called when the shake animation ends.
setWidth | Function | Callback method to pass the width to a parent Component.
shouldFloat | Boolean | Floats label depending on value passed.
shouldShake | Boolean | Shakes label depending on value passed.

## Usage

### Positioning

React Floating Label is meant to be used with other Components, specifically input type elements. Floating label is positioned absolute, which requires the parent element to be position _relative_ or _absolute_.

### Float Label

Toggling the `shouldFloat` property between true/false will float/dock the label. Ex:

```js
<FloatingLabel shouldFloat={this.state.shouldFloat}>
  My Label
</FloatingLabel>
```

### Shake Label

Toggling the `shouldShake` prop to true will start the shake animation. Toggling the `shouldShake` prop to false while animation is animating, will cause animation to end. Once animation ends, the `onShakeEnd()` callback will be called if the parent component needs to be notified. Ex:

```js
<FloatingLabel
  shouldShake={this.state.shouldShake}
  onShakeEnd={() => this.setState({shouldShake: false})}
>
  My Label
</FloatingLabel>
```

### Label Width

Label width is set during mount, and is calculated from the `offsetWidth` property. The Component will call `setWidth()` when mounted. `setWidth()` will execute with a new width value if `this.props.children` changes.

```js
<FloatingLabel
  setWidth={(width) => this.setState({width})}
>
  My Label
</FloatingLabel>
```


## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.34.1/packages/mdc-fab/README.md#advanced-sass-mixins)
