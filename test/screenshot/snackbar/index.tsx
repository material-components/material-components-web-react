import React from 'react';
import '../../../packages/snackbar/index.scss';
import './index.scss';
import {Snackbar} from '../../../packages/snackbar/index';
import Button from '../../../packages/button/index';

class ProgramaticSnackbar extends React.Component {
  state = {isOpen: false};

  render() {
    return (
      <React.Fragment>
        <Button
          outlined
          onClick={() => this.setState({isOpen: !this.state.isOpen})}
        >
          {!this.state.isOpen ? 'Open' : 'Hide'}
        </Button>
        <Snackbar
          message='Example'
          actionText='action'
          open={this.state.isOpen}
          onClose={() => this.setState({isOpen: false})}
        />
      </React.Fragment>
    );
  }
}
const SnackbarScreenshotTest = () => {
  return (
    <div>
      <div className='snackbar-container'>
        <Snackbar message='Example' />
      </div>
      <div className='snackbar-container'>
        <Snackbar message='Example' actionText='action' />
      </div>
      <div className='snackbar-container'>
        <Snackbar message='Example' leading={true} actionText='action' />
      </div>
      <div className='snackbar-container'>
        <Snackbar message='Example' stacked={true} actionText='action' />
      </div>
      <div className='snackbar-container'>
        <ProgramaticSnackbar />
      </div>
    </div>
  );
};

export default SnackbarScreenshotTest;
