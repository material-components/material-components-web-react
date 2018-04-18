# React Card

MDC React Card is a component for material design cards.

## Installation

```
npm install @material/react-card
```

## Usage

```html
<Card>
  <CardContent>
    <h1>Header</h1>
    <CardMedia imageUrl='./my/fancy/image.png' />
  </CardContent>

  <CardActions>
    <CardActionButtons>
      <button>Click Me</button>
    </CardActionButtons>

    <CardActionIcons>
      <i>Click Me Too!</i>
    <CardActionIcons>
  </CardActions>
</Card>
```

## Components

The following components are MDC Card components. Other components outside of this package can be used in conjunction with these components, since there is such large variation of types of cards. For further descriptions, please refer to [MDC Card](https://github.com/material-components/material-components-web/tree/master/packages/mdc-card).

> NOTE: All following components will still pass through the props `className` and `style`.

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

### CardContent

This component is used as the container for primary tappable content.

```js
import Card, {CardContent} from '@material/react-card';

<Card>
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>
```

### Card

This is the container component for the entire card. All other components listed in this documentation should be child to this component.

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
stroked | n/a | Enables stroked outline of card.

### CardMedia

This component is used as a container for an image on the card. Optionally, any children of the `<CardMedia>` component will be passed through with the className `.mdc-card__media-content`.

```js
import {CardMedia} from '@material/react-card';

<CardMedia imageUrl='./my/fancy/image.png'>
  <span>Fancy Image</span>
</CardMedia>
```

#### Props
Prop Name | Type | Description
--- | --- | ---
contentClassName | string | Adds class to the parent element of `children`.
square | n/a | Scales the height of the image to be equal to the width of the image.
wide | n/a | Scales the height of the image maintaining a 16:9 aspect ratio.
imageUrl | string | Path to the image of the `<CardMedia>` component.
