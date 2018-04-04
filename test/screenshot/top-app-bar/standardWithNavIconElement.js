import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';

import MaterialIcon from '../../../packages/material-icon';
import asActionItem from '../../../packages/top-app-bar/asActionItem';
const ActionItem = asActionItem(MaterialIcon);

import '../../../packages/top-app-bar/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <TopAppBar
      title='Miami, FL'
      navIcon={<a
        className='material-icons'
        href='#'
        onClick={() => console.log('click')}>
        menu
      </a>}
      actionItems={[<ActionItem key='item' icon='bookmark'/>]}
    />
  </div>
), document.getElementById('app'));
