# React Typography

A React version of an [MDC Typography](https://github.com/material-components/material-components-web/tree/master/packages/mdc-typography).

## Installation

```
npm install @material/react-typography
```

## Usage

### Styles

with Sass:
```js
import '@material/react-typography/index.scss';
```

with CSS:
```js
import '@material/react-typography/dist/typography.css';
```

### Javascript Instantiation
```js
import React from 'react';
import {
  Body1,
  Body2,
  Button,
  Caption,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Overline,
  Subtitle1,
  Subtitle2,
} from '@material/react-typography';

class MyApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Headline1>Kate Lockwell</Headline1>
        <Headline2>Jim Raynor</Headline2>
        <Headline3>Kerrigan</Headline3>
        <Headline4>Arcturus Mengsk</Headline4>
        <Headline5>Valerian Mengsk</Headline5>
        <Headline6>Donny Vermillion</Headline6>
        <Subtitle1>Kate Lochwell</Subtitle1>
        <Subtitle2>Jim Raynor</Subtitle2>
        <Body1>Kerrigan</Body1>
        <Body2>Arcturus Mengsk</Body2>
        <Caption>Valerian Mengsk</Caption>
        <Button>Donny Vermillion</Button>
        <Overline>Kate Lockwell</Overline>
      </React.Fragment>
    );
  }
}
```

## Components

### Headline1

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'h1'`)

### Headline2

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'h2'`)

### Headline3

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'h3'`)

### Headline4

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'h4'`)

### Headline5

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'h5'`)

### Headline6

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'h6'`)

### Subtitle1

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'h6'`)

### Subtitle2

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'h6'`)

### Body1

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'p'`)

### Body2

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'p'`)

### Button

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'span'`)

### Caption

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'span'`)

### Overline

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the component. The text to display
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'span'`)

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/tree/master/packages/mdc-typography#sass-mixins)
