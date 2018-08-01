import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import {Switch} from '../../../packages/switch';

class SwitchTest extends React.Component {
  state = {
  };

  render() {
    return (
      <Switch />
    );
  }
}

ReactDOM.render((
  <div>
    Switch
    <SwitchTest />
  </div>
), document.getElementById('app'));
