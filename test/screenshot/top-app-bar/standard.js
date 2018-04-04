import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import '../../../packages/top-app-bar/index.scss';
import '../../../packages/material-icon/index.scss';
import './index.scss';

import MaterialIcon from '../../../packages/material-icon';
import asNavIcon from '../../../packages/top-app-bar/asNavIcon';
import asActionItem from '../../../packages/top-app-bar/asActionItem';

const NavIcon = asNavIcon(MaterialIcon);
const ActionItem = asActionItem(MaterialIcon);

ReactDOM.render((
  <div>
    <TopAppBar
      title='Miami, FL'
      navIcon={<NavIcon icon='menu' onClick={() => console.log('click')}/>}
      actionItems={[<ActionItem key='item' icon='bookmark'/>]}
    />
  </div>
), document.getElementById('app'));
