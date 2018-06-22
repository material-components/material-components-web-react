import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import ChipSet from '../../../packages/chips';

ReactDOM.render((
  <div>
    <ChipSet 
      chips={[
        {label: 'Jane Smith'},
        {label: 'John Doe'}
      ]}
    />
    <ChipSet
      className='demo-custom-color' 
      chips={[
        {label: 'Custom color'},
        {label: 'Custom color'}
      ]}
    />
  </div>
), document.getElementById('app'));
