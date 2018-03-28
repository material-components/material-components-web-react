import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from '../../../packages/top-app-bar';
import LoremIpsumContent from './LoremIpsumContent';
import NavIcon from './NavIcon';

import '../../../packages/top-app-bar/index.scss';
import './index.scss';

ReactDOM.render((
  <div>
    <TopAppBar
      title='Miami, Fl'
      navIcon={<NavIcon />}
    />

    <LoremIpsumContent />
  </div>
), document.getElementById('app'));
