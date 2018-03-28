import './temporary-package.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import MyClass from '../../../packages/temporary-package/react';

ReactDOM.render((
  <MyClass/>
), document.getElementById('app'));
