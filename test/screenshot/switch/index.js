import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import Switch from '../../../packages/switch';

ReactDOM.render((
  <div>
    <Switch />
    <Switch checked />
    <Switch disabled />
    <div dir='rtl'>
      <Switch />
      <Switch checked />
      <Switch disabled />
    </div>
  </div>
), document.getElementById('app'));
