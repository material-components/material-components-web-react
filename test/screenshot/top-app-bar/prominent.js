import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import LoremIpsumContent from './LoremIpsumContent';
import NavIcon from './NavIcon';
import actionItems from './actionItems';

import '../../../packages/top-app-bar/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <TopAppBar
      prominent
      title='Miami, Fl'
      navIcon={<NavIcon />}
      actionItems={actionItems}
    />

    <LoremIpsumContent />
  </div>
), document.getElementById('app'));
