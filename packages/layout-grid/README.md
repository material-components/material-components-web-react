# React Layout Grid

A React version of an [MDC Layout Grid](https://github.com/material-components/material-components-web/tree/master/packages/mdc-layout-grid).

## Installation

```
npm install @material/react-layout-grid
```

## Usage

### Styles

with Sass:
```js
import '@material/react-layout-grid/index.scss';
```

with CSS:
```js
import '@material/react-layout-grid/dist/layout-grid.css';
```

### Javascript Instantiation
```js
import React from 'react';
import {Cell, Grid, Row} from '@material/react-layout-grid';

class MyApp extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Cell columns={4}>Tennis</Cell>
          <Cell columns={4}>Cricket</Cell>
          <Cell columns={4}>StarCraft</Cell>
        </Row>
        <Row>
          <Cell desktopColumns={4} order={2} phoneColumns={4} tabletColumns={4}>Tennis</Cell>
          <Cell desktopColumns={4} order={3} phoneColumns={4} tabletColumns={4}>Cricket</Cell>
          <Cell desktopColumns={4} order={1} phoneColumns={4} tabletColumns={4}>StarCraft</Cell>
        </Row>
        <Row>
          <Cell columns={4}>
            <Row>
              <Cell desktopColumns={8} phoneColumns={2} tabletColumns={5}>Tennis</Cell>
              <Cell desktopColumns={4} phoneColumns={2} tabletColumns={3}>Cricket</Cell>
            </Row>
          </Cell>
          <Cell columns={4}> - </Cell>
          <Cell columns={4}> - </Cell>
        </Row>
      </Grid>
    );
  }
}

// with alignment
class MyAppAligned extends React.Component {
  render() {
    return (
      <Grid align="right">
        <Row>
          <Cell align="top">Tennis<br /><br /><br /><br /><br /></Cell>
          <Cell align="middle">Cricket</Cell>
          <Cell align="bottom">StarCraft</Cell>
        </Row>
      </Grid>
    );
  }
}
```

## Components

### Grid

#### Props

Prop Name | Type | Description
--- | --- | ---
align | String (`left` or `right`) | An optional alignment of the grid contents
children | Node | A React node to render within the Grid, usually a `Row` or `Row`s
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'div'`)

### Row

#### Props

Prop Name | Type | Description
--- | --- | ---
children | Node | A React node to render within the Row, usually a `Cell` or `Cell`s
className | String | Classes to be applied to the root element
tag | String | The tag type to render (default `'div'`)

### Cell

#### Props

Prop Name | Type | Description
--- | --- | ---
align | String (`bottom`, `middle` or `top`) | An optional alignment of the cell contents
children | Node | A React node to render within the Cell
className | String | Classes to be applied to the root element
columns | Number (1-12) | The width of the cell on all devices
desktopColumns | Number (1-12) | The width of the cell on desktop
order | Number (1-12) | The order that the cell is displayed in
phoneColumns | Number (1-4) | The width of the cell on phones
tabletColumns | Number (1-8) | The width of the cell on tablets
tag | String | The tag type to render (default `'div'`)

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/tree/master/packages/mdc-layout-grid#sass-mixins)
