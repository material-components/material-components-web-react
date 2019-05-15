import React from 'react';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
} from '../../../packages/dialog/index';
import Button from '../../../packages/button/index';
import './index.scss';

class Alert extends React.Component<{}, {isOpen: boolean; action: string}> {
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
          <DialogContent>
            <p className='mdc-typography--body1'>Discard Draft?</p>
          </DialogContent>
          <DialogFooter>
            <DialogButton action='dismiss'>Cancel</DialogButton>
            <DialogButton action='discard' isDefault>
              Discard
            </DialogButton>
          </DialogFooter>
        </Dialog>
      </main>
    );
  }
}

export default Alert;
