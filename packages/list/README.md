> ✨ Are you a part of the Material Design web community? Help us improve by filling out this <a href='https://bit.ly/materialwebsurvey'>**10 minute survey**</a>. ✨

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

## Variants

### Two-Line List

You can use the `twoLine` Boolean prop for `List` combined with the `secondaryText` prop for `ListItem` to style a list as a double line list.

```js
import React, {Component} from 'react';
import List, {ListItem, ListItemText} from '@material/react-list';

class MyApp extends React.Component {
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

### List groups

Multiple related lists can be grouped together using the `ListGroup` component. Optional subheaders can be added using `ListGroupSubheader`.

> _NOTE_: You can override the element that the `ListGroup` or `ListGroupSubheader` renders by passing in a `tag` prop. By default, `ListGroup` renders a `div` and `ListGroupSubheader` renders an `h3`.

```js
import React, {Component} from 'react';
import List, {ListItem, ListItemText, ListGroup, ListGroupSubheader} from '@material/react-list';

class MyApp extends Component {
  render() {
    return (
      <ListGroup>
        <ListGroupSubheader tag='h2'>Folders</ListGroupSubheader>
        <List>
          <ListItem><ListItemText primaryText='Photos' /></ListItem>
          ...
        </List>
        <ListGroupSubheader tag='h2'>Recent Files</ListGroupSubheader>
        <List>
          <ListItem><ListItemText primaryText='Vacation' /></ListItem>
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
class MyApp extends React.Component {
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
twoLine | Boolean | Styles the list with two lines
singleSelection | Boolean | Allows for single selection of list items
wrapFocus | Boolean | Sets the list to allow the up arrow on the first element to focus the last element of the list and vice versa
selectedIndex | Number | Toggles the selected state of the list item at the given index
handleSelect | Function(selectedIndex: Number) => void | Callback for handling a list item selection event
aria-orientation | String | Indicates the list orientation

### ListItem

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the list item element
classNamesFromList | Array<String> | Additional classes to be applied to the list item element, passed down from list
attributesFromList | Additional attributes to be applied to the list item element, passed down from list
childrenTabIndex | Number | Tab index to be applied to all children of the list item
shouldFocus | Whether to focus the list item
shouldFollowHref | Whether to follow the link indicated by the list item
shouldToggleCheckbox | Whether to toggle the checkbox on the list item
onClick | Function(evt: Event) => void | Callback for handling a click event
onKeyDown | Function(evt: Event) => void | Callback for handling a keydown event
onFocus | Function(evt: Event) => void | Callback for handling a focus event
onBlur | Function(evt: Event) => void | Callback for handling a blur event

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

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-list/README.md#sass-mixins)
