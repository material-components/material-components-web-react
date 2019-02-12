import * as React from 'react';
import '../../../packages/snackbar/index.scss';
import './index.scss';
import {Snackbar} from '../../../packages/snackbar/index';

const ButtonScreenshotTest = () => {
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
    </div>
  );
};
export default ButtonScreenshotTest;
