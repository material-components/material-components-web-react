import React from 'react';
import ReactDOM from 'react-dom';
import '../../../packages/material-icon/index.scss';
import './index.scss';

import MaterialIcon from '../../../packages/material-icon';

ReactDOM.render((
  <div>
    <MaterialIcon icon='menu' className='material-icons--ripple-surface' />
  </div>
), document.getElementById('app'));
