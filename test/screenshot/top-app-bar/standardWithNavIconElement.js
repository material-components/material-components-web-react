import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import NavIcon from './NavIcon';
import ActionItem from './ActionItem';

import '../../../packages/top-app-bar/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <TopAppBar
      title='Miami, Fl'
      navIcon={<a
        className='material-icons'
        href='#'
        onClick={() => console.log('click')}>
        menu
      </a>}
      actionItems={[<ActionItem />]}
    />
  </div>
), document.getElementById('app'));
