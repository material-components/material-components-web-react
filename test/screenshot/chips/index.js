import React from 'react';
import ReactDOM from 'react-dom';

// import Chip from '../../../packages/chips/chip';
import ChipSet from '../../../packages/chips/chip-set';

import '../../../packages/chips/index.scss';
import './index.scss';

ReactDOM.render((
  <ChipSet chips={[
    {label: 'Jane Smith'},
    {label: 'John Doe'}]}
  />
), document.getElementById('app'));
