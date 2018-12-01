# React List

A React version of an [MDC List](https://github.com/material-components/material-components-web/tree/master/packages/mdc-list).

## Installation

```
npm install @material/react-list
```

## Usage

### Styles

with Sass:
```js
import '@material/react-list/index.scss';
```

with CSS:
```js
import "@material/react-list/dist/list.css";
```

### Javascript Instantiation

```js
import React, {Component} from 'react';
import List, {ListItem, ListItemText} from '@material/react-list';

class MyApp extends Component {
  render() {
    return (
      <List>
        <ListItem>
          <ListItemText primaryText='Photos'/>
        </ListItem>
        <ListItem>
          <ListItemText primaryText='Recipes'/>
        </ListItem>
        <ListItem>
          <ListItemText primaryText='Work'/>
        </ListItem>
      </List>
    );
  }
}
```

> _NOTE_: Please use the `ListItem` component to specify list items. `List` will not recognize custom list item components.
>
> Also, you can override the element that the `List` or `ListItem` renders by passing in a `tag` prop. By default, `List` renders a `ul` and `ListItem` renders an `li`. For semantic HTML and a11y, as well as working with routing libraries such as [React Router](https://github.com/ReactTraining/react-router) and [Next.js' Link](https://github.com/zeit/next.js#with-link), you may wish to use `nav` and `a` respectively if using the components to render a page's navigation.

## Variants

### Two-Line List

You can use the `twoLine` Boolean prop for `List` combined with the `secondaryText` prop for `ListItem` to style a list as a double line list.

```js
import React, {Component} from 'react';
import List, {ListItem, ListItemText} from '@material/react-list';

class MyApp extends Component {
  render() {
    return (
      <List twoLine>
        <ListItem>
          <ListItemText
            primaryText='Photos'
            secondaryText='Jan 9, 2018' />
        </ListItem>
        <ListItem>
          <ListItemText
            primaryText='Recipes'
            secondaryText='Jan 17, 2018' />
        </ListItem>
        <ListItem>
          <ListItemText
            primaryText='Work'
            secondaryText='Jan 28, 2018' />
        </ListItem>
      </List>
    );
  }
}
```

### List item supporting visuals and metadata

You may add a leading visuals or trailing metadata to a list item using `ListItemGraphic` before or `ListItemMeta` after `ListItemText`.

```js
import React, {Component} from 'react';
import MaterialIcon from '@material/react-material-icon';
import List, {ListItem, ListItemGraphic, ListItemText, ListItemMeta} from '@material/react-list';

class MyApp extends Component {
  render() {
    return (
      <List>
        <ListItem>
          <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
          <ListItemText primaryText='Photos' />
          <ListItemMeta meta='info' />
        </ListItem>
        ...
      </List>
    );
  }
}

```

### List groups and list dividers

Multiple related lists can be grouped together using the `ListGroup` component. Optional subheaders can be added using `ListGroupSubheader`. `ListDivider`s can be used to separate content either within a list or between lists.

```js
import React, { Component } from "react";
import List, {
  ListItem, ListItemText, ListGroup, 
  ListGroupSubheader,ListDivider
} from "@material/react-list";

class MyApp extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupSubheader tag="h2">Folders</ListGroupSubheader>
        <List>
          <ListItem>
            <ListItemText primaryText="Photos" />
          </ListItem>
          ...
        </List>
        <ListDivider />
        <ListGroupSubheader tag="h2">Recent Files</ListGroupSubheader>
        <List>
          <ListItem>
            <ListItemText primaryText="Vacation" />
          </ListItem>
          ...
        </List>
      </ListGroup>
    );
  }
}
```

### Single Selection

You can use the `singleSelection` Boolean prop for `List` to allow for selection of list items. You can also set the `selectedIndex` of the list programmatically and include a `handleSelect` callback.

> _NOTE_: If you are inserting or removing list items, you must update the `selectedIndex` accordingly.

```js
import React, {Component} from 'react';
import List, {ListItem, ListItemText} from '@material/react-list';

class MyApp extends Component {
  state = {
    selectedIndex: 1,
  };

  render() {
    return (
      <List
        singleSelection
        selectedIndex={this.state.selectedIndex}
        handleSelect={(selectedIndex) => this.setState({selectedIndex})}
      >
        <ListItem>
          <ListItemText primaryText='Photos'/>
        </ListItem>
        <ListItem>
          <ListItemText primaryText='Recipes'/>
        </ListItem>
        <ListItem>
          <ListItemText primaryText='Work'/>
        </ListItem>
      </List>
    );
  }
}
```

## Props

### List

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list element
nonInteractive | Boolean | Disables interactivity affordances
dense | Boolean | Styles the density of the list, making it appear more compact
avatarList | Boolean | Configures the leading tiles of each row to display images instead of icons. This will make the graphics of the list items larger
twoLine | Boolean | Styles the list with two linesn
singleSelection | Boolean | Allows for single selection of list items
wrapFocus | Boolean | Sets the list to allow the up arrow on the first element to focus the last element of the list and vice versa
selectedIndex | Number | Toggles the selected state of the list item at the given index
handleSelect | Function(selectedIndex: Number) => void | Callback for handling a list item selection event
aria-orientation | String | Indicates the list orientation
tag | String | Customizes the list tag type (defaults to `'ul'`)

### ListItem

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list item element
classNamesFromList | Array<String> | Additional classes to be applied to the list item element, passed down from list
attributesFromList | n/a | Additional attributes to be applied to the list item element, passed down from list
childrenTabIndex | Number | Tab index to be applied to all children of the list item
shouldFocus | n/a | Whether to focus the list item
shouldFollowHref | n/a | Whether to follow the link indicated by the list item
shouldToggleCheckbox | n/a | Whether to toggle the checkbox on the list item
onClick | Function(evt: Event) => void | Callback for handling a click event
onKeyDown | Function(evt: Event) => void | Callback for handling a keydown event
onFocus | Function(evt: Event) => void | Callback for handling a focus event
onBlur | Function(evt: Event) => void | Callback for handling a blur event
tag | String | Customizes the list tag type (defaults to `'li'`)

### ListItemText

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list item text element
tabIndex | Number | Tab index of the list item text
tabbableOnListItemFocus | Boolean | Whether focusing list item will toggle tab index of the list item text. If false, the tab index will always be -1
primaryText | String | Primary text for the list item
secondaryText | String | Secondary text for the list item

### ListItemGraphic

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list item graphic element
tabIndex | Number | Tab index of the list item graphic
tabbableOnListItemFocus | Boolean | Whether focusing list item will toggle tab index of the list item graphic. If false, the tab index will always be -1
graphic | Element | The graphic element to be displayed in front of list item text

### ListItemGraphic

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list item meta element
tabIndex | Number | Tab index of the list item meta
tabbableOnListItemFocus | Boolean | Whether focusing list item will toggle tab index of the list item meta. If false, the tab index will always be -1
meta | Element or String | The meta element or string to be displayed behind list item text

### ListDivider

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list divider
tag | String | Element tag of the list divider, defaults to `li`
role | String | ARIA role of the list divider, defaults to `separator`

### ListGroup

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list group
tag | String | Element tag of the list group, defaults to `div`


### ListGroupSubheader

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list group subheader
tag | String | Element tag of the list group subheader, defaults to `h3`

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-list/README.md#sass-mixins)
