import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import {Chip} from '../../../packages/chips';
import ChipSet from '../../../packages/chips';

ReactDOM.render((
  <div>
    Choice chips
    <ChipSet choice>
      <Chip
        label='Jane Smith'
        selected
      />
      <Chip
        label='John Doe'
      />
    </ChipSet>

    Filter chips
    <ChipSet filter className='demo-custom-color'>
      <Chip
        label='Jane Smith'
        selected
      />
      <Chip
        label='John Doe'
      />
    </ChipSet>
  </div>
), document.getElementById('app'));
