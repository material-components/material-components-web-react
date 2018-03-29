# Top App Bar React

MDC React Top App Bar acts as a React container around MDC Top App Bar, and implements MDC Top App Bar's foundation layer. Please see [MDC Top App Bar](https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar).

## Installation

```
npm install @material/react-top-app-bar
```

## Usage

### JSX Structure

```html
<TopAppBar />
```

### Variants

There are several Top App Bar variants that can be applied to the React Component via props. IE short Top App Bar can be triggered with the follow markup:

```html
<TopAppBar short />
```

Variants | Attribute Name
--- | ---
Short | short
Always Collapsed | alwaysCollapsed
Prominent | prominent

> NOTE: As per design guidelines, prominent variant should not be used with short or always collapsed.

## Props

Prop Name | Type | Description
--- | ---
actionItems | Array | Accepts an array of elements that should be rendered to the opposite side of the title. Note that a single action item should also be passed as an array.
className | String | Classes to be applied to the root element.
title | String | The title of the Top App Bar.
navIcon | Element | Appears adjacent to the title. This acts as the main action of the Top App Bar.
