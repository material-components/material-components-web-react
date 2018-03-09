import './temporary-package.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import MyClass from '../../../packages/temporary-package/react';
import TemporaryClass from '../../../packages/temporary-package';

const temporary = new TemporaryClass();
console.log(temporary.returnOne());
ReactDOM.render((
  <MyClass/>
), document.getElementById('app'));
