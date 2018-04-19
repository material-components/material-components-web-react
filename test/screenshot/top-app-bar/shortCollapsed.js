import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';

import MaterialIcon from '../../../packages/material-icon';

import '../../../packages/material-icon/index.scss';
import '../../../packages/top-app-bar/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <TopAppBar
      shortCollapsed
      navigationIcon={<MaterialIcon
        icon='menu'
        onClick={() => console.log('click')}
      />}
    />
  </div>
), document.getElementById('app'));
