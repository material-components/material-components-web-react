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
    <Switch className='custom-switch' nativeControlId='custom-switch-input' checked />
    <label for='custom-switch-input'>Custom switch with label</label>
  </div>
), document.getElementById('app'));
