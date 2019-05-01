import React from 'react';
import NotchedOutline from '../../../packages/notched-outline/index';
import FloatingLabel from '../../../packages/floating-label/index';
import '../../../packages/notched-outline/index.scss';
import './index.scss';

const NotchedOutlineScreenshotTest = () => {
  return (
    <div>
      <div className='notched-outline-container'>
        <NotchedOutline />
      </div>

      <div className='notched-outline-container'>
        <NotchedOutline notchWidth={0}>
          <FloatingLabel>Not Notched Outline</FloatingLabel>
        </NotchedOutline>
      </div>

      <div className='notched-outline-container'>
        <NotchedOutline notchWidth={160} notch>
          <FloatingLabel float>Notched outline</FloatingLabel>
        </NotchedOutline>
      </div>

      <div className='notched-outline-container'>
        <FloatingLabel float>Label outside of notched outline</FloatingLabel>
        <NotchedOutline />
      </div>
    </div>
  );
};

export default NotchedOutlineScreenshotTest;
