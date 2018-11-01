# 🔥🌈⚡️ Are you a part of the Material Design web community? Help us improve by filling out this 10 minute <a href='https://bit.ly/materialwebsurvey'>survey</a>. 🔥🌈⚡️

# React Drawer

A React version of an [MDC Drawer](https://github.com/material-components/material-components-web/tree/master/packages/mdc-drawer).

## Installation

```
npm install @material/react-drawer
```

## Usage

### Styles

with Sass:
```js
import '@material/react-drawer/index.scss';
```

with CSS:
```js
import "@material/react-drawer/dist/drawer.css";
```

### Javascript Instantiation

Below is the basic example of a drawer. `<SomeDrawerContent />` is not defined, but can be any element. Guidelines state it should be navigational content. Typically it is a [list](https://material.io/design/components/lists.html).

```js
import React, {Component} from 'react';
import Drawer from '@material/react-drawer';

class MyApp extends Component {
  render() {
    return (
      <Drawer>
        <SomeDrawerContent />
      </Drawer>
    );
  }
}
```

#### Header and Content Variant

You may want to include a header, which MDC Web has already styled for you. For convenience, we've included `<DrawerHeader />`, `<DrawerSubtitle />`, `<DrawerTitle />`, and `<DrawerContent />` components. `DrawerHeader` and `DrawerContent` default to a `<div>` tag, while the `DrawerTitle` and `DrawerSubtitle` default to an `h3` and `h6` tag respectively, but can be customized with the `tag` prop (example shown below).

```js
import React, {Component} from 'react';
import Drawer, {
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
} from '@material/react-drawer';

class MyApp extends Component {
  render() {
    return (
      <Drawer>
        <DrawerHeader> {/*defaults to div*/}
          <DrawerTitle tag='h2'> {/*defaults to h3*/}
            Inbox
          </DrawerTitle>
          <DrawerSubtitle> {/*defaults to h6*/}
            matt@email.com
          </DrawerSubtitle>
        </DrawerHeader>

        <DrawerContent tag='main'>  {/*defaults to div*/}
          <SomeDrawerContent />
        </DrawerContent>
      </Drawer>
    );
  }
}
```

#### Dismissible Variant

The 2 previous examples are both permanent drawer examples, which are stationary. If you have a smaller screen, or want to keep focus on your main content you may want to use a [dismissible drawer](https://github.com/material-components/material-components-web/tree/master/packages/mdc-drawer#dismissible-drawer). The dismissible drawer will expand and collapse based on the `open` prop.

You will also want to use the `<DrawerAppContent />` component, which will wrap around your content, that should animate in/out with the dismissible drawer.

```js
import React, {Component} from 'react';
import Drawer, {DrawerAppContent} from '@material/react-drawer';

class MyApp extends Component {
  state = {open: false};

  render() {
    return (
      <div>
        <Drawer
          dismissible
          open={this.state.open}
        >
          <SomeDrawerContent />
        </Drawer>
        <DrawerAppContent>
          Your really cool app content here
          <button onClick={() => this.setState({open: !this.state.open})}>
            {this.state.open ? 'Open' : 'Close'} Drawer
          </button>
        </DrawerAppContent>
      </div>
    );
  }
}
```

#### Modal Variant

If you are on a smaller screen and do not want to animation your content, you may want to use the [modal drawer](https://github.com/material-components/material-components-web/tree/master/packages/mdc-drawer#modal-drawer). The modal drawer will expand and collapse based on the `open` prop overlayed your application content.

You should also implement the `onClose` callback prop, which is triggered after the drawer closes. This is your opportunity to set the `open` state variable to false.

> NOTE: Closes with `esc` key or `scrim` click.

```js
import React, {Component} from 'react';
import Drawer, {DrawerAppContent} from '@material/react-drawer';

class MyApp extends Component {
  state = {open: false};

  render() {
    return (
      <div>
        <Drawer
          modal
          open={this.state.open}
          onClose={() => this.setState({open: false})}
        >
          <SomeDrawerContent />
        </Drawer>
        <div>
          Your really cool app content here
          <button onClick={() => this.setState({open: !this.state.open})}>
            {this.state.open ? 'Open' : 'Close'} Drawer
          </button>
        </div>
      </div>
    );
  }
}
```

### Accessibility

#### Focus Management

It is recommended to shift focus to the first focusable element in the main content when drawer is closed or one of the destination items is activated. (By default, MDC React Drawer restores focus to the menu button which opened it.)

#### Dismissible Drawer

Restore focus to the first focusable element when a list item is activated or after the drawer closes. Do not close the drawer upon item activation, since it should be up to the user when to show/hide the dismissible drawer.

```js
import React, {Component} from 'react';
import Drawer from '@material/react-drawer';
import Button from '@material/react-button';

class Drawer extends Component {
  mainContentEl = React.createRef();

  focusFistFocusableItem = () => {
    this.mainContentEl.current.querySelector('input, button').focus();
  }

  onDrawerClose = () => {
    this.setState({open: false});
    this.focusFistFocusableItem();
  }

  render() {

    return (
      <div>
        <Drawer
          modal
          open={this.state.open}
          onClose={this.drawerOnClose}
        >
          <List>
            <ListItem onClick={this.focusFistFocusableItem}>
              <ListItemText primaryText='list item' />
            </ListItem>
          </List>
        </Drawer>
        <div ref={this.mainContentEl}>
          <Button raised>Click me!</Button>
        </div>
      </div>
    );
  }
}
```

#### Modal Drawer

Close the drawer when an item is activated in order to dismiss the modal as soon as the user performs an action. Only restore focus to the first focusable element in the main content after the drawer is closed, since it's being closed automatically.

```js
import React, {Component} from 'react';
import Drawer from '@material/react-drawer';
import Button from '@material/react-button';

class Drawer extends Component {
  mainContentEl = React.createRef();

  onDrawerClose = () => {
    this.setState({open: false});
    this.mainContentEl.current.querySelector('input, button').focus();
  }

  onListItemClick = () => this.onDrawerClose();

  render() {

    return (
      <div>
        <Drawer
          modal
          open={this.state.open}
          onClose={this.drawerOnClose}
        >
          <List>
            <ListItem onClick={this.onListItemClick}>
              <ListItemText primaryText='list item' />
            </ListItem>
          </List>
        </Drawer>
        <div ref={this.mainContentEl}>
          <Button raised>Click me!</Button>
        </div>
      </div>
    );
  }
}
```

## Props

### Drawer

Prop Name | Type | Description
--- | --- | ---
className | String | Classes to be applied to the drawer element.
onOpen | Function() => void | Callback after the drawer has opened.
onClose | Function() => void | Callback after the drawer has closed.
modal | Boolean | Indicates that the drawer is of type modal.
dismissible | Boolean | Indicates that the drawer is of type dismissible.
tag | String | Customizes the drawer tag type (default to `<aside>`).

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/tree/master/packages/mdc-drawer#sass-mixins)
