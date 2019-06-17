# React Menu

A React version of an [MDC Menu](https://github.com/material-components/material-components-web/tree/master/packages/mdc-menu).

## Installation

```
npm install @material/react-menu
```

## Usage

### Styles

with Sass:
```js
import '@material/react-list/index.scss';
import '@material/react-menu-surface/index.scss';
import '@material/react-menu/index.scss';
```

with CSS:
```js
import '@material/react-list/dist/menu.css';
import '@material/react-menu-surface/dist/menu.css';
import '@material/react-menu/dist/menu.css';
```

### Javascript Instantiation

```js
import React from 'react';
import Menu, {MenuList, MenuListItem, MenuListItemText} from '@material/react-menu';

class MyApp extends React.Component {
  state = {
    open: true,
    coordinates: undefined,
  };

  componentDidMount() {
    window.addEventListener('contextmenu', this.rightClickCallback);
  }

  componentWillUnmount() {
    window.removeEventListener('contextmenu', this.rightClickCallback);
  }

  rightClickCallback = (event) => {
    this.setState({
      open: !this.state.open,
      coordinates: {x: event.clientX, y: event.clientY},
    });
    // Must preventDefault so the system context menu doesn't appear.
    // This won't be needed in other cases besides right click.
    event.preventDefault();
  }

  // Must set open to false to keep menu in the correct state.
  // This does not follow the controlled component pattern
  // (see https://reactjs.org/docs/forms.html#controlled-components).
  // Follow https://github.com/material-components/material-components-web-react/issues/785
  // to get any updates.
  onClose = () => {
    this.setState({open: false});
  }

  render() {
    const menuOptions = [
      'Save',
      'Edit',
      'Cut',
      'Copy',
      'Paste',
    ];

    return (
      <Menu
        open={this.state.open}
        onClose={this.onClose}
        coordinates={this.state.coordinates}
        onSelected={(index, item) => console.log(index, item)}
      >
        <MenuList>
          {menuOptions.map((option, index) => (
            <MenuListItem key={index}>
              <MenuListItemText primaryText={option} />
              {/* You can also use other components from list, which are documented below */}
            </MenuListItem>
          ))}
        </MenuList>
      </Menu>
    );
  }
}
```

### Usage with HOC's

You may want to use Menu or other auxilary components with an HOC, such as [styled-components](https://www.styled-components.com). You can wrap Menu using the following:


```js
import React from 'react';
import Menu, {MenuList, MenuListItem, MenuListItemText} from '@material/react-menu';
import styled from 'styled-components';

interface MenuState {
  coordinates?: {x: number, y: number};
  open: boolean;
};

const StyledMenuListItem = styled(MenuListItem)`
  color: blue;
`;

class MenuScreenshotTest extends React.Component<{}, MenuState> {

  state = {
    open: true,
  };

  onClose = () => {
    this.setState({open: false});
  }

  render() {
    const menuOptions = [
      'Save',
      'Edit',
      'Cut',
      'Copy',
      'Paste',
    ];

    return (
      <Menu
        open={this.state.open}
        onClose={this.onClose}
        onSelected={() => console.log('select')}
      >
        <MenuList>
          {menuOptions.map((option, index) => (
            <StyledMenuListItem key={index}>
              <MenuListItemText primaryText={option} />
            </StyledMenuListItem>
          ))}
        </MenuList>
      </Menu>
    );
  }
}
```



## Props


### Menu

Prop Name | Type | Description
--- | --- | ---
onSelected | (index: number, item: Element) => void | Callback that is triggered when a menu list item is selected.
onClose | () => void | Callback that is triggered when the menu closes.
open | boolean | If true, will open the menu. If false, will hide menu.

> NOTE: onClose and open are a subset of props from Menu Surface. See [Menu Surface Props](../menu-surface/README.md#props) for other props you can pass to Menu

### MenuList

Prop Name | Type | Description
--- | --- | ---
innerRef | RefObject | Root Menu List element ref.
handleSelect | (activatedItemIndex: Number, selected: Number | Array<Number>) => void | Callback for handling a list item selection event. `selected` will be an Array,Number> for checkbox lists.

> NOTE: handleSelect is a subset of props from List. See [List Props](../list/README.md#list) for other props you can pass to MenuList.

### MenuListItem

See [List Props](../list/README.md#listitem) for other props you can pass to MenuListItem.

### MenuListItemText

See [List Item Text Props](../list/README.md#listitemtext) for other props you can pass to MenuListItemText.

### MenuListItemGraphic

See [List Item Graphic Props](../list/README.md#listitemgraphic) for other props you can pass to MenuListItemGraphic.

### MenuListItemMeta

See [List Item Meta Props](../list/README.md#listitemmeta) for other props you can pass to MenuListItemMeta.

### MenuListDivider

See [List Divider Props](../list/README.md#listdivider) for other props you can pass to MenuListDivider.

### MenuListGroup

See [List Group Props](../list/README.md#listgroup) for other props you can pass to MenuListGroup.

### MenuListGroupSubheader

See [List Group Subheader Props](../list/README.md#listgroupsubheader) for other props you can pass to MenuListGroupSubheader.


## Sass Mixins

Sass mixins may be available to customize various aspects of the components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-menu/README.md#advanced-sass-mixins)

## Usage with Icons

Please see our [Best Practices doc](../../docs/best-practices.md#importing-font-icons) when importing or using icon fonts.
