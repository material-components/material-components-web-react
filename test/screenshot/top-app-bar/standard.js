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
      title='Miami, FL'
      navigationIcon={<MaterialIcon
        icon='menu'
        className='material-icons--ripple-surface'
        onClick={() => console.log('click')}
      />}
      actionItems={[<MaterialIcon key='item' icon='bookmark' className='material-icons--ripple-surface'/>]}
    />
  </div>
), document.getElementById('app'));
