import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '../../../packages/dialog/index';
import Button from '../../../packages/button/index';
import './index.scss';

class DialogScreenShotTest extends React.Component {

  state = {isOpen: false, action: ''}

  render() {
    return (
      <main className="mdc-layout-grid">
        <aside>
          <Button
            raised
            onClick={(e) => this.setState({isOpen: !this.state.isOpen})}
          >{this.state.isOpen ? 'close dialog' : 'open dialog' }</Button>
          <p className="mdc-typography--body1">Dialog Action:
            <samp>&emsp;{this.state.action}</samp>
          </p>
        </aside>
        <Dialog
          onClose={(action) => this.setState({isOpen: false, action})}
          open={this.state.isOpen}>
          <DialogTitle id="dialog-title">Simple Dialog</DialogTitle>
          <DialogContent>
            <p className="mdc-typography--body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </DialogContent>
          <DialogFooter>
            <DialogButton action="dismiss">
              Decline commodo consequat
            </DialogButton>
            <DialogButton action="accept" isDefault>
              Accept Lorem
            </DialogButton>
          </DialogFooter>
        </Dialog>
      </main>
    );
  }
}

export default DialogScreenShotTest;
