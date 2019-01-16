import * as React from 'react';
import '../../../packages/top-app-bar/index.scss';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '../../../packages/dialog/index';
import Button from '../../../packages/button/index';
import List, {ListItem, ListItemGraphic} from '../../../packages/list/index';
import Radio, {NativeRadioControl} from '../../../packages/radio/index';
import './index.scss';

const choices: string[] = ['never gonna give yo up', 'host cross buns', 'none'];

class Confirmation extends React.Component<{}, {isOpen: boolean; action: string;}> {
  state = {isOpen: true, action: ''};

  render() {
    return (
      <main className='mdc-layout-grid'>
        <aside>
          <Button
            raised
            onClick={() => this.setState({isOpen: !this.state.isOpen})}
          >{this.state.isOpen ? 'close dialog' : 'open dialog' }</Button>
          <p className='mdc-typography--body1'>Dialog Action:
            <samp>&emsp;{this.state.action}</samp>
          </p>
        </aside>
        <Dialog
          escapeKeyAction='esc'
          scrimClickAction='click'
          onClose={(action: string) => this.setState({isOpen: false, action})}
          open={this.state.isOpen}>
          <DialogTitle>Phone Ringtone</DialogTitle>
          <DialogContent>
            <List singleSelection>
              {choices.map((choice: string, i: number) => {
                let c: string = choice.replace(/\s/g, '-');
                return (
                  <ListItem key={i}>
                    <ListItemGraphic graphic={
                      <Radio label={choice} key={c}>
                        <NativeRadioControl
                          className='mdc-list-item__text'
                          name='ringtone'
                          value={choice}
                          id={c}
                        />
                      </Radio>}
                    />
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogFooter>
            <DialogButton action='dismiss'>
              Cancel
            </DialogButton>
            <DialogButton action='confirm' isDefault>
              Ok
            </DialogButton>
          </DialogFooter>
        </Dialog>
      </main>
    );
  }
}

export default Confirmation;
