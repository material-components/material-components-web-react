# Fab React

MDC React Fab acts as a React container around MDC Fab. Please see [MDC Fab](https://github.com/material-components/material-components-web/tree/master/packages/mdc-fab).

## Installation

```
npm install @material/react-fab
```

## Usage

### JSX Structure

The Fab can be used with the `span`, `i`, `img` or `svg` elements. It can also be used with the
[Material Icon](../material-icon) react component.
```html
<Fab>
  <span className="material-icons">favorite</span>
</Fab>

<Fab>
  <i className="material-icons">favorite</i>
</Fab>

<Fab>
  <svg xmlns="http://www.w3.org/2000/svg" className="material-icons" viewBox="0 0 24 24">
  ...
  </svg>
</Fab>

<Fab>
  <img className="material-icons" src="/images/ic_button_24px.svg"/>
</Fab>

<Fab>
  <MaterialIcon icon="favorite"/>
</Fab>
```

## Props

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the root element.
mini | n/a | Enables the mini variant.

## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them. 

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/v0.35.0/packages/mdc-fab/README.md#advanced-sass-mixins)
