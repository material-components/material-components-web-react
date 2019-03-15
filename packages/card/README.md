# React Card

A React version of an [MDC Card](https://github.com/material-components/material-components-web/tree/master/packages/mdc-card).

## Installation

```
npm install @material/react-card
```

## Usage

### Syles

with Sass:
```js
import '@material/react-card/index.scss';
```

with CSS:
```js
import '@material/react-card/dist/card.css';
```

### Javascript Instantiation
```js
import React from 'react';
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";

const MyApp = () => {
  return (
    <Card>
      <CardPrimaryContent>
        <h1>Header</h1>
        <CardMedia square imageUrl='./my/fancy/image.png' />
      </CardPrimaryContent>

      <CardActions>
        <CardActionButtons>
          <button>Click Me</button>
        </CardActionButtons>

        <CardActionIcons>
          <i>Click Me Too!</i>
        </CardActionIcons>
      </CardActions>
    </Card>
  );
}
```

## Components

The following components are MDC Card components. Other components outside of this package also can be used with these components, since there is such a large variety of card types. For further descriptions, please refer to [MDC Card](https://github.com/material-components/material-components-web/tree/master/packages/mdc-card).

> NOTE: All following components will still pass through the props `className` and `style`.

### Card

This is the container component for the entire card. All other components listed in this documentation should be a child to this component.

```js
import Card from '@material/react-card';

<Card>
  <h1>Title</h1>
  <p>Content</p>
</Card>
```

#### Props
Prop Name | Type | Description
--- | --- | ---
outlined | n/a | Enables an outline on the card.

### CardPrimaryContent

This component is used as the container for primary tappable content.

```js
import Card, {CardPrimaryContent} from '@material/react-card';

<Card>
  <CardPrimaryContent>
    <p>Content</p>
  </CardPrimaryContent>
</Card>
```

### CardMedia

This component is a container for an image on the card. Optionally, any children of the `<CardMedia>` component is wrapped with an element with the className `.mdc-card__media-content`. In order for your image to display, CardMedia requires that you have an aspect ratio of either `square` or `wide`.

```js
import {CardMedia} from '@material/react-card';

<CardMedia square imageUrl='./my/fancy/image.png'>
  <span>Fancy Image</span>
</CardMedia>
```

#### Props
Prop Name | Type | Description
--- | --- | ---
contentClassName | string | Adds a class to the `.mdc-card__media-content` element.
square | n/a | Scales the height of the image to be equal to the width of the image.
wide | n/a | Scales the height of the image maintaining a 16:9 aspect ratio.
imageUrl | string | Path to the image of the `<CardMedia>` component.

### CardActions

Acts as a container for `<CardActionButtons>` and/or `<CardActionIcons>`. It should be used as the last child of the `<Card>` component.

```js
import {CardActions, CardActionButtons, CardActionIcons} from '@material/react-card';

<CardActions>
  <CardActionButtons> ... </CardActionButtons>
  <CardActionIcons> ... </CardActionIcons>
</CardActions>
```

#### Props

Prop Name | Type | Description
--- | --- | ---
fullBleed | n/a | Enables full bleed card actions row by removing all padding.

### CardActionButtons

It acts as a container for buttons of the card. This component is a child of a `<CardActions>` component.

```js
import {CardActionButtons} from '@material/react-card';

<CardActionButtons>
  <button onClick={ ... }>Action 1</button>
  <button onClick={ ... }>Action 2</button>
</CardActionButtons>
```

### CardActionIcons

It acts as a container for icons of the card. This component is a child of a `<CardActions>` component. It can be used by itself or used as a sibling directly after the `<CardActionButtons>` component.

```js
import {CardActionIcons} from '@material/react-card';

<CardActionIcons>
  <i onClick={ ... }>Icon 1</i>
  <i onClick={ ... }>Icon 2</i>
</CardActionIcons>
```


## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-card/README.md#sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
