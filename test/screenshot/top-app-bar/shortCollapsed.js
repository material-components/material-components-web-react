import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import NavIcon from './NavIcon';

import '../../../packages/top-app-bar/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <TopAppBar
      shortCollapsed
      navIcon={<NavIcon />}
    />
  </div>
), document.getElementById('app'));
