import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import ChipSet from '../../../packages/chips';

ReactDOM.render((
  <div>
    <ChipSet 
      chipLabels={['Jane Smith', 'John Doe']}
    />
    <ChipSet
      className='demo-custom-color' 
      chipLabels={['Custom color', 'Custom color']}
    />
  </div>
), document.getElementById('app'));
