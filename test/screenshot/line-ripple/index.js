import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import LineRipple from '../../../packages/line-ripple';

ReactDOM.render((
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
), document.getElementById('app'));
