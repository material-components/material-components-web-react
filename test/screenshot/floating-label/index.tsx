import React from 'react';
import FloatingLabel from '../../../packages/floating-label/index';
import '../../../packages/floating-label/index.scss';
import './index.scss';

const FloatingLabelScreenshotTest = () => {
  return (
    <div>
      <div className='floated-label-box-example'>
        <FloatingLabel>My Label Text</FloatingLabel>
      </div>

      <div className='floated-label-box-example'>
        <FloatingLabel float>Floated Label</FloatingLabel>
      </div>
    </div>
  );
};
export default FloatingLabelScreenshotTest;
