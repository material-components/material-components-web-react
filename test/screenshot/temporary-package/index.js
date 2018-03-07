import React from 'react';
import ReactDOM from 'react-dom';
import TemporaryClass from '../../../packages/temporary-package';

const temporary = new TemporaryClass();
ReactDOM.render((
  <div>{temporary.returnOne()}</div>
), document.getElementById('app'));
