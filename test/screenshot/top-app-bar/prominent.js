import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import '../../../packages/top-app-bar/index.scss';
import '../../../packages/material-icon/index.scss';
import './index.scss';

import MaterialIcon from '../../../packages/material-icon';

ReactDOM.render((
  <div>
    <TopAppBar
      prominent
      title='Miami, FL'
      navigationIcon={<MaterialIcon icon='menu' onClick={() => console.log('prominent click')}/>}
      actionItems={[<MaterialIcon key='item' icon='bookmark'/>]}
    />
  </div>
), document.getElementById('app'));
