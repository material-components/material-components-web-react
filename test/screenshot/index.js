import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './Home';

console.log('HI')
ReactDOM.render((
  <BrowserRouter>
    <Route exact path="/" component={Home}/>
  </BrowserRouter>
), document.getElementById('mcdr-screenshot-test-app'));
