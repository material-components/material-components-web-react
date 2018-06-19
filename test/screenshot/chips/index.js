import React from 'react';
import ReactDOM from 'react-dom';

import Chip from '../../../packages/chips/chip';

import '../../../packages/chips/index.scss';
import './index.scss';

ReactDOM.render((
  <Chip label='Hello world'/>
), document.getElementById('app'));
