# React Dialog

A React version of an [MDC Dialog](https://github.com/material-components/material-components-web/tree/master/packages/mdc-dialog).

## Installation

```
npm install @material/react-dialog
```

## Usage

### Styles

with Sass:
```js
import '@material/react-dialog/index.scss';
```

with CSS:
```js
import "@material/react-dialog/dist/dialog.css";
```

### Javascript Instantiation


#### Basic Usage

Below is a basic example of a dialog. `<MyDialogContent />` is not defined, but
can be any element.

```js
import React, {Component} from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';

class MyApp extends Component {
  state = {isOpen: true};

  render() {
    return (
      <Dialog open={isOpen}>
        <DialogTitle>My Dialog</DialogTitle>
        <DialogContent>
          <MyDialogContent />
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Dismiss</DialogButton>
          <DialogButton action='accept' isDefault>Accept</DialogButton>
        </DialogFooter>
      </Dialog>
    );
  }
}
 ```
>NOTE: Titles cannot contain leading whitespace due to how `mdc-typography-baseline-top()` works.


### Variants

### Alert Dialog

The Alert Dialog interrupt users with urgent information, details, or actions.

```js
import React, {Component} from 'react';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';

class Alert extends Component {
  state = {isOpen: true, action: ''};

  render() {
    return (
      <Dialog
        onClose={(action: string) => this.setState({isOpen: false, action})}
        open={this.state.isOpen}>
        <DialogContent>
          <p>Discard Draft?</p>
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Cancel</DialogButton>
          <DialogButton action='discard' isDefault>Discard</DialogButton>
        </DialogFooter>
      </Dialog>
    );
  }
}


```


#### Simple Dialog

The Simple Dialog contains a list of potential actions. It does not contain buttons.

```js
import React, {Component} from 'react';
import Dialog, {DialogTitle, DialogContent} from '@material/react-dialog';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';

class Simple extends Component {
  state = {
    isOpen: true
    choices: ['user1@example.com', 'user2@example.com', 'Add Account']
    action: ''
  };

  render() {
    return (
      <Dialog 
        open={isOpen} 
        onClose={(action) => this.setState({action, isOpen: false})}>
        <DialogTitle>Select User</DialogTitle>
        <DialogContent>
            <List avatarList>
              {choices.map((choice, i) => (
                <ListItem key={i} data-mdc-dialog-action={choice}>
                  <ListItemGraphic graphic={
                    <MaterialIcon icon={choice.match(/@/) ? 'person' : 'add'}/>
                  }/>
                  <ListItemText primaryText={choice}/>
                </ListItem>
              ))
              }
            </List>
        </DialogContent>
      </Dialog>
    );
  }
}
 ```
>NOTES: (1) the inclusion of the `avatarList`, which aligns with the Simple
>Dialog spec. (2) the `data-mdc-dialog-action` which singals the chosen action `onClose()`


### Confirmation Dialog

The Confirmation Dialog contains a list of choices, and buttons to confirm or
cancel. Choices are accompanied by radio buttons (indicating single selection)
or checkboxes (indicating multiple selection).

```js
import React, {Component} from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';
import List, {ListItem, ListItemText} from '@material/react-list';
import Radio, {NativeRadioControl} from '@material/react-radio';


class Confirmation extends Component
  state = {
    isOpen: false, 
    action: '', 
    selectedIndex: -1,
    choices: ['Never gonna give you up', 'Host cross buns', 'None'];
   };

  isChecked = (i) => i === this.state.selectedIndex;

  render() {
    return (
      <Dialog
        onClose={(action) => this.setState({isOpen: false, action})}
        open={this.state.isOpen}>
        <DialogTitle>Chose a Phone Ringtone</DialogTitle>
        <DialogContent>
          <List 
            singleSelection 
            handleSelect={ (selectedIndex) => this.setState({selectedIndex})}
          >{choices.map((choice, i) => {
              let cleanChoice = choice.replace(/\s/g, '-');
              return (
                <ListItem key={i}>
                  <!-- Note: <ListItemGraphic/> will not work here -->
                  <span className='mdc-list-item__graphic'>
                    <Radio>
                      <NativeRadioControl
                        name='ringtone'
                        value={choice}
                        id={cleanChoice}
                        checked={this.isChecked(i)}
                        onChange={() => {}}
                      />
                    </Radio>
                  </span>
                  <label htmlFor={cleanChoice}>
                    <ListItemText primaryText={choice}/>
                </label>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Cancel</DialogButton>
          <DialogButton action='confirm' isDefault>Ok</DialogButton>
        </DialogFooter>
      </Dialog>
    );
  }
}
```

## Props

### Dialog 

Prop Name | Type | Description | Default
--- | --- | --- | ---
autoStackButtons | Boolean | reverses the buttons when applying the stacked layout. | `true`
className | String | classes to applied to the root element | n/a
children | Node | ReactElement to render in the dialog only available children are `DialogTitle`,`DialogContent`, or `DialogFooter`.  | n/a
escapeKeyAction | String |  the action reflected when the Escape key is pressed. Setting to `''` disables closing via the escape key | `close`
id | String | the id attribute placed on the root element | `mdc-dialog`
onClose | Function (action) => void | Callback after the dialog has closed. | n/a
onClosing | Function (action) => void | Callback for when the dialog begins to close. | `() => {}`
onOpen | Function () => void | Callback after the dialog has opened | n/a
onOpening | Function () => void | Callback for when the dialog begins to open. | `() => {}`
open | Boolean | If true opens the dialog. If false closes the dialog | `false`
role | String | [ARIA attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role) that specifies the role of dialog. Must be `alertdialog` or `dialog` | `alertdialog`
scrimClickAction | String | the action reflected when the scrim is clicked. Setting to `''` disables closing via scrim click| `close` 
tag | String | Customizes the `Dialog` tag type. | `div`
### DialogTitle

Prop Name | Type | Description 
--- | --- | --- 
className | String | the classes applied to the root element of `DialogTitle`
id | String | the id attribute placed on the root element. 
tag | String | customizes the `DialogTitle` tag type. (defaults: `h2`)
> NOTE: that `id` is also set to `aria-labelledby` on the `<Dialog/>` element .
 Additionally, if unset will default to the `id` of `<Dialog/>` with the suffix
  `-title`.

### DialogContent 

Prop Name | Type | Description 
--- | --- | --- 
className | String | the classes applied to the root element of `DialogContent`
id | String | the id attribute placed on the root element. 
tag | String | customizes the `DialogContent` tag type. (defaults: `div`)
> NOTE: that `id` value is also set to `aria-describedby` on the `<Dialog/>` 
element. Additionally, if unset will default the to `id` of `<Dialog/>` with the 
suffix `-content`. 

### DialogFooter

Prop Name | Type | Description 
--- | --- | --- 
className | String | the classes applied to the root element of `DialogContent`
tag | String | customizes the `DialogFooter` tag type. (defaults: `footer`)

### DialogButton

Prop Name | Type | Description 
--- | --- | --- 
action | String | required action of the button. Returned  `onClose` && `onClosing` in `<Dialog/>`
className | String | the classes applied to the root element of `DialogButton`
isDefault | Boolean |  represents the default action, triggered by pressing the Enter key (defaults: `false`)

## Sass Mixins

Sass mixins may be available to customize various aspects of the Components. Please refer to the
MDC Web repository for more information on what mixins are available, and how to use them.

[Advanced Sass Mixins](https://github.com/material-components/material-components-web/blob/master/packages/mdc-dialog/README.md#sass-mixins)
 
