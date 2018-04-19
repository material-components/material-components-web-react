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
      short
      title='Miami, FL'
      navigationIcon={<MaterialIcon
        icon='menu'
        onClick={() => console.log('short click')}
      />}
      actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
    />
  </div>
), document.getElementById('app'));
