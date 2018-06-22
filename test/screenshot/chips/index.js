import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import ChipSet from '../../../packages/chips';

ReactDOM.render((
  <div>
    <ChipSet 
      labels={['Jane Smith', 'John Doe']}
    />
    <ChipSet
      className='demo-custom-color' 
      labels={['Custom color', 'Custom color']}
    />
  </div>
), document.getElementById('app'));
