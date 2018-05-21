import React from 'react';
import ReactDOM from 'react-dom';
import '../../../packages/chips/index.scss';
import './index.scss';

import ChipSet from '../../../packages/chips';

ReactDOM.render((
  <div>
    <ChipSet chips={[
      {name: 'Jane Smith'},
      {name: 'John Doe'}]}
    />
  </div>
), document.getElementById('app'));