import React from 'react';
import ReactDOM from 'react-dom';
import '../../../packages/material-icon/index.scss';
import './index.scss';

import MaterialIcon from '../../../packages/material-icon';

ReactDOM.render((
  <div>
    <MaterialIcon icon='menu' hasRipple />

    <br />

    <MaterialIcon icon='favorite' />
  </div>
), document.getElementById('app'));
