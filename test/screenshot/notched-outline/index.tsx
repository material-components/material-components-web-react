import * as React from 'react';
import NotchedOutline from '../../../packages/notched-outline/index';
import '../../../packages/notched-outline/index.scss';
import './index.scss';

const NotchedOutlineScreenshotTest = () => {
  return (
    <div>
      <div className='notched-outline-container'>
        <NotchedOutline />
      </div>

      <div className='notched-outline-container'>
        <NotchedOutline notchWidth={50} notch />
      </div>

      <div className='notched-outline-container'>
        <NotchedOutline notchWidth={100} notch>
          <label className='mdc-floating-label'>Label</label>
        </NotchedOutline>
      </div>
    </div>
  );
};

export default NotchedOutlineScreenshotTest;
