import React from 'react';
import ReactDOM from 'react-dom';

import NotchedOutline from '../../../packages/notched-outline';

import '../../../packages/notched-outline/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <div className='notched-outline-container'>
      <NotchedOutline />
    </div>

    <div className='notched-outline-container'>
      <NotchedOutline notchWidth={50} notch />
    </div>

    <div className='notched-outline-container'>
      <NotchedOutline notchWidth={100} notch isRtl />
    </div>
  </div>
), document.getElementById('app'));
