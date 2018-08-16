import React from 'react';
import ReactDOM from 'react-dom';

import '../../../packages/line-ripple/index.scss';
import './index.scss';

import LineRipple from '../../../packages/line-ripple';

export default () => {
  return (
    <div>
      <div
        className='line-ripple-container'>
        <LineRipple />
      </div>

      <div
        className='line-ripple-container'>
        <LineRipple active />
      </div>
    </div>
  );
}
