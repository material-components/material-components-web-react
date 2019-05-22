import React from 'react';
import Dialog, {
  DialogContent,
  DialogTitle,
} from '../../../packages/dialog/index';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
} from '../../../packages/list/index';
import Button from '../../../packages/button/index';
import MaterialIcon from '../../../packages/material-icon/index';
import './index.scss';

const choices: string[] = [
  'user1@example.com',
  'user2@example.com',
  'Add Account',
];
class Simple extends React.Component<{}, {isOpen: boolean; action: string}> {
  state = {isOpen: true, action: ''};

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
            <samp>&emsp;{this.state.action}</samp>
          </p>
        </aside>
        <Dialog
          onClose={(action: string) => this.setState({isOpen: false, action})}
          open={this.state.isOpen}
        >
          <DialogTitle>Select an Account</DialogTitle>
          <DialogContent>
            <List avatarList>
              {choices.map((choice: string, i: number) => (
                <ListItem key={i} data-mdc-dialog-action={choice}>
                  <ListItemGraphic
                    graphic={
                      <MaterialIcon
                        icon={choice.match(/@/) ? 'person' : 'add'}
                      />
                    }
                  />
                  <ListItemText primaryText={choice} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </main>
    );
  }
}

export default Simple;
