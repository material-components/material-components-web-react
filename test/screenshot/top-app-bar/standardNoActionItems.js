import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';

import MaterialIcon from '../../../packages/material-icon';
import asNavIcon from '../../../packages/top-app-bar/asNavIcon';
const NavIcon = asNavIcon(MaterialIcon);

import '../../../packages/top-app-bar/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <TopAppBar
      title='Miami, FL'
      navIcon={<NavIcon icon='menu' onClick={() => console.log('click')}/>}
    />
  </div>
), document.getElementById('app'));
