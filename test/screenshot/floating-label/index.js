import React from 'react';
import ReactDOM from 'react-dom';
import FloatingLabel from '../../../packages/floating-label';

import '../../../packages/floating-label/index.scss';
import './index.scss';

export default () => {
  return (
    <div>
      <div className='floated-label-box-example'>
        <FloatingLabel>
          My Label Text
        </FloatingLabel>
      </div>

      <div className='floated-label-box-example'>
        <FloatingLabel float>
          Floated Label
        </FloatingLabel>
      </div>
    </div>
  );
}
