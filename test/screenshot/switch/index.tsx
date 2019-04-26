import React from 'react';
import './index.scss';

import Switch from '../../../packages/switch';

class SelectTest extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Switch />
        <Switch checked />
        <Switch disabled />
        <div dir='rtl'>
          <Switch />
          <Switch checked />
          <Switch disabled />
        </div>
        <Switch
          className='custom-switch'
          nativeControlId='custom-switch-input'
          checked
        />
        <label htmlFor='custom-switch-input'>Custom switch with label</label>
      </div>
    );
  }
}
export default SelectTest;
