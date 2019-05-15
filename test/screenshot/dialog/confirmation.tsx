import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '../../../packages/dialog/index';
import Button from '../../../packages/button/index';
import List, {ListItem, ListItemText} from '../../../packages/list/index';
import Radio, {NativeRadioControl} from '../../../packages/radio/index';
import './index.scss';

const choices: string[] = ['Never gonna give yo up', 'Host cross buns', 'None'];

class Confirmation extends React.Component<
  {},
  {isOpen: boolean; action: string; selectedIndex: number}
> {
  state = {isOpen: false, action: '', selectedIndex: -1};

  isChecked = (i: number) => i === this.state.selectedIndex;

  render() {
    return (
      <main className='mdc-layout-grid'>
        <aside>
          <Button
            raised
            onClick={() => this.setState({isOpen: !this.state.isOpen})}
          >
            {this.state.isOpen ? 'close dialog' : 'open dialog'}
          </Button>
          <p className='mdc-typography--body1'>
            Dialog Action:
            <samp>
              &emsp;{this.state.action} &bull; Selected Index:{' '}
              {this.state.selectedIndex}
            </samp>
          </p>
        </aside>
        <Dialog
          escapeKeyAction={'esc'}
          scrimClickAction={'scrimClick'}
          onClose={(action: string) => this.setState({isOpen: false, action})}
          open={this.state.isOpen}
        >
          <DialogTitle>Phone Ringtone</DialogTitle>
          <DialogContent>
            <List
              singleSelection
              handleSelect={(selectedIndex) => this.setState({selectedIndex})}
            >
              {choices.map((choice: string, i: number) => {
                const c: string = choice.replace(/\s/g, '-');
                return (
                  <ListItem key={i}>
                    <span className='mdc-list-item__graphic'>
                      <Radio key={c}>
                        <NativeRadioControl
                          name='ringtone'
                          value={choice}
                          id={c}
                          checked={this.isChecked(i)}
                          onChange={() => {}}
                        />
                      </Radio>
                    </span>
                    <label htmlFor={c}>
                      <ListItemText primaryText={choice} />
                    </label>
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogFooter>
            <DialogButton action='dismiss'>Cancel</DialogButton>
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
